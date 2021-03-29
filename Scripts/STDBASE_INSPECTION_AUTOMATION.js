/*
Title : Inspection Automation (After) 
Purpose : To perform a set of action based on inspection result
Author: Yazan Barghouth 
 
 Functional Area : AV
 
 JSON Example : 
{
  "Marijuana/Combo/Testing Facility/Application": {
    "InspectionResultSubmitAfter": [
      {
        "metadata": {
          "description": "To perform a set of action based on inspection result",
          "operators": {
            "caseFailureStatus":"!="
          }
        },
        "criteria": {
          "inspectionTypePerformed": [
            "Initial Facility Insp"
          ],
          "inspectionResult": [
            "Passed"
          ]
        },
        "action": {
          "costRangeType": "Days",
          "costRange": 0,
          "costFeeType": "",
          "costFeeSchedule": "",
          "costFeeName": "",
          "costFeeAmount": 0,
          "newAppStatus": "In Review",
          "caseCreationType": "Status",
          "caseFailureStatus": [
            "Passed"
          ],
          "caseType": "Marijuana/Combo/Testing Facility/Application",
          "caseCopyComments": false,
          "inspectionType": "Marijuana Inspector",
          "inspectionCopyComment": false,
          "rangeType": "Days",
          "range": "10",
          "rangeTypeToCustomField": "Inspection Interval Unit",
          "rangeToCustomField": "Inspection Interval",
          "basedOnScheduledDate": true,
          "basedOnResultDate": false
          "sameInspector": false,
          "createCondition": "",
          "createConditionType": "",
          "createConditionSeverity": "",
          "feeSchedule": "",
          "feeName": "",
          "feeAmount": 0,
          "taskName": "Intake",
          "taskStatus": "In Progress",
          "removeCondition": "",
          "removeConditionType": "",
          "expirationTypeUpdate":"Expiration Code",
          "expirationDaysToAdvance":"30",
          "cancelAllInspections" : true ; 
        },
        "preScript": "",
        "postScript": ""
      }
    ]
  }
}

Notes:
	- new property added 'newAppStatus': update record status if Event criteria matched (set empty to ignore)
	- new property added 'inspectionCopyComment': copy current inspection's result to the new scheduled inspection(if any)
		inspectionCopyComment: true/false
	
	- new property added: 'expirationTypeUpdate' update expiration date of record, options: 'Expiration Code' or 'ASI:asi_filed_name'
		in case of 'ASI', it can be with or without subgroup, example, 'ASI:subgroupName.fieldName' OR 'ASI:asiFieldName'
	- new property added: 'expirationDaysToAdvance' : days to add to current date (now) and update expiration
	
	property 'caseFailureStatus' is supported with operators
 * 
 */
//try to get CONFIGURABLE_SCRIPTS_COMMON from Non-Master, if not found, get from Master
var configurableCommonContent = getScriptText("CONFIGURABLE_SCRIPTS_COMMON");
if (configurableCommonContent && configurableCommonContent != null && configurableCommonContent != "") {
	eval(configurableCommonContent);
} else {
	eval(getScriptText("CONFIGURABLE_SCRIPTS_COMMON", null, true));
}

var scriptSuffix = "INSPECTION_AUTOMATION";

var settingsArray = [];
if (isConfigurableScript(settingsArray, scriptSuffix)) {
	for (s in settingsArray) {

		var rules = settingsArray[s];

		//Execute PreScript
		var preScript = rules.preScript;
		if (!matches(preScript, null, "")) {
			eval(getScriptText(preScript));
		}
		if (cancelCfgExecution) {
			logDebug("**WARN STDBASE Script [" + scriptSuffix + "] canceled by cancelCfgExecution");
			cancelCfgExecution = false;
			continue;
		}

		inspectionAutomation(rules);

		var postScript = rules.postScript;
		//Execute PostScript
		if (!matches(postScript, null, "")) {
			eval(getScriptText(postScript)); // , null, false ???
		}

	}// for all settings
}// isConfigurableScript()

function inspectionAutomation(rules) {
	

	var cancelAllInspections = rules.action.cancelAllInspections ;
	if(!isEmptyOrNull(cancelAllInspections) )
	{
	 if(cancelAllInspections)
	 {
		 var inspecs = aa.inspection.getInspections(capId).getOutput();
		 for (i in inspecs) {
		      var cancelResult = aa.inspection.cancelInspection(capId ,inspecs[i].getIdNumber() ) 
		      if (cancelResult.getSuccess())
		      {
		    	  logDebug("Cancelling inspection: " + inspecs[i].getInspectionType());
		      }
		       else
		    	   logDebug("**ERROR","**ERROR: Cannot cancel inspection: "+inspecs[i].getInspectionType()+", "+cancelResult.getErrorMessage());    
		 }
	 }
	}

	
	if (!isEmptyOrNull(rules.action.costRangeType) && !isEmptyOrNull(rules.action.costFeeSchedule) && !isEmptyOrNull(rules.action.costFeeName)
			&& !isEmptyOrNull(rules.action.costFeeType)) {
		var costRangeDays = calculateUnifiedRange(rules.action.costRangeType, rules.action.costRange);
		var totalInspecs = 0;
		var inspecs = aa.inspection.getInspections(capId).getOutput();

		var now = new Date(aa.util.now());
		for (i in inspecs) {
			if (inspecs[i].getInspectionDate() == null || inspecs[i].getInspectionDate() == "") {
				continue;
			}

			if (dateDiff(inspecs[i].getInspectionDate(), now) <= costRangeDays) {
				++totalInspecs;
			}
		}//for all inspections

		var calculatedFeeCost = 0;
		if (totalInspecs > 0) {
			if (rules.action.costFeeType.equalsIgnoreCase("once")) {
				calculatedFeeCost = rules.action.costFeeAmount;
			} else if (rules.action.costFeeType.equalsIgnoreCase("each")) {
				calculatedFeeCost = rules.action.costFeeAmount * totalInspecs;
			}
			addFee(rules.action.costFeeName, rules.action.costFeeSchedule, "FINAL", calculatedFeeCost, "Y");
		}
	}//can process cost fee

	if (!isEmptyOrNull(rules.action.newAppStatus)) {
		updateAppStatus(rules.action.newAppStatus, "by script");
	}

	var createCase = false;

	if (!isEmptyOrNull(rules.action.caseCreationType) && !isEmptyOrNull(rules.action.caseFailureStatus)) {
		var failurStats = rules.action.caseFailureStatus;
		if (rules.action.caseCreationType.equalsIgnoreCase("Status")) {
			for (fs in failurStats) {
				if (failurStats[fs].equalsIgnoreCase(inspResult)) {
					createCase = true;
					break;
				}
			}
		} else if (rules.action.caseCreationType.equalsIgnoreCase("Checklist")) {
			var chkListResutArray = loadGuideSheetItems(inspId);
			for (cr in chkListResutArray) {
				for (fs in failurStats) {
					if (failurStats[fs].equalsIgnoreCase(chkListResutArray[cr])) {
						createCase = true;
						break;
					}
				}//for fs
				if (createCase) {
					break;
				}
			}//for chkListResutArray
		}//checklist
	}
	//check if it has operators
	createCase = evaluateBoolean(createCase, getLogicalOp(rules, "caseFailureStatus"));
	if (createCase) {
		var recordTypeArray = rules.action.caseType.split("/");
		var appCreateResult = aa.cap.createApp(recordTypeArray[0], recordTypeArray[1], recordTypeArray[2], recordTypeArray[3], "InspectionAutomation-Failed");

		if (appCreateResult.getSuccess()) {
			var newId = appCreateResult.getOutput();

			//copy inspComments
			if (rules.action.caseCopyComments) {
				createCapComment(inspComment, newId);//inspResultComment
			}
			aa.cap.createAppHierarchy(capId, newId);
		} else {
			logDebug("**WARN: ERROR InspectionAutomationScript Creating App [" + rules.caseType + "] err:" + appCreateResult.getErrorMessage());
		}
	}
	
	var rangeType = "" ;
	
	if(!isEmptyOrNull(rules.action.rangeType) && !rules.action.rangeType.equalsIgnoreCase("custom field") )
		{
		rangeType = rules.action.rangeType ;
		}
	else if(!isEmptyOrNull(rules.action.rangeTypeToCustomField))
		{
		var rangeTypeToCustomField =  rules.action.rangeTypeToCustomField ;
		if( rangeTypeToCustomField.indexOf(".") >-1)
			{
			useAppSpecificGroupName = true;
			}
		else
			{
			useAppSpecificGroupName = false;
			}
		rangeType = getAppSpecific( rangeTypeToCustomField ,capId ) ; 
		}
	
    var rangeValue = "" ;
    
    if(!isEmptyOrNull(rules.action.range) && !rules.action.range.equalsIgnoreCase("custom field") && !isNaN(rules.action.range) )
	{
    	rangeValue = rules.action.range ;
	}
else if(!isEmptyOrNull(rules.action.rangeToCustomField))
	{
	var rangeToCustomField =  rules.action.rangeToCustomField ;
	if( rangeToCustomField.indexOf(".") >-1)
		{
		useAppSpecificGroupName = true;
		}
	else
		{
		useAppSpecificGroupName = false;
		}
	    rangeValue = getAppSpecific( rangeToCustomField ,capId ) ; 
	}
    
	if (!isEmptyOrNull(rules.action.inspectionType) && !isEmptyOrNull(rules.action.sameInspector) && !isEmptyOrNull(rangeType) && !isEmptyOrNull(rangeValue)
			&& !isEmptyOrNull(rules.action.inspectionCopyComment)) {
		var currInspector = null;
		schedInspection(rules.action.inspectionType, rules.action.sameInspector, rangeType, rangeValue , rules.action.inspectionCopyComment);
	}//inspection params validation

	if (!isEmptyOrNull(rules.action.createConditionType) && !isEmptyOrNull(rules.action.createCondition) && !isEmptyOrNull(rules.action.createConditionSeverity)) {
		addAppCondition(rules.action.createConditionType, "Applied", rules.action.createCondition, rules.action.createCondition, rules.action.createConditionSeverity);
	}

	if (!isEmptyOrNull(rules.action.feeName) && !isEmptyOrNull(rules.action.feeSchedule) && !isEmptyOrNull(rules.action.feeAmount)) {
		addFee(rules.action.feeName, rules.action.feeSchedule, "FINAL", rules.action.feeAmount, "Y");
	}

	if (!isEmptyOrNull(rules.action.taskName) && !isEmptyOrNull(rules.action.taskStatus)) {
		updateTaskHandleDisposition(rules.action.taskName, rules.action.taskStatus);
	}

	if (!isEmptyOrNull(rules.action.removeConditionType) && !isEmptyOrNull(rules.action.removeCondition)) {
		removeCapCondition(rules.action.removeConditionType, rules.action.removeCondition);
	}

	if (!isEmptyOrNull(rules.action.expirationTypeUpdate) && !isEmptyOrNull(rules.action.expirationDaysToAdvance)) {
		var newExpDate = dateAdd(new Date(aa.util.now()), parseInt(rules.action.expirationDaysToAdvance));

		if (rules.action.expirationTypeUpdate.equalsIgnoreCase("Expiration Code")) {
			var rB1ExpResult = aa.expiration.getLicensesByCapID(capId).getOutput();
			rB1ExpResult.setExpDate(aa.date.parseDate(newExpDate));
			var updated = aa.expiration.editB1Expiration(rB1ExpResult.getB1Expiration());
		} else if (String(rules.action.expirationTypeUpdate).toLowerCase().indexOf("asi") == 0) {
			var asiFieldName = String(rules.action.expirationTypeUpdate);
			asiFieldName = asiFieldName.substring(4, rules.action.expirationTypeUpdate.length);//4 is len of 'asi:'
			var olduseAppSpecificGroupName = useAppSpecificGroupName;
			useAppSpecificGroupName = asiFieldName.indexOf(".") != -1;//support group.field and field
			editAppSpecific(asiFieldName, newExpDate);
			useAppSpecificGroupName = olduseAppSpecificGroupName;
		} else {
			logDebug("**WARN unsupported expirationTypeUpdate " + rules.action.expirationTypeUpdate);
		}
	}//has expirationTypeUpdate
}

/**
 * this is identical to ACCELA_FUNCTIONS version, except we replace all "**ERROR" with "**INFO"
 * from logDebug() because **ERROR causes a rollback, which we don't want.
 * */
function autoAssignInspectionLocal(e) {
	iObjResult = aa.inspection.getInspection(capId, e);
	if (!iObjResult.getSuccess()) {
		logDebug("**INFO retrieving inspection " + e + " : " + iObjResult.getErrorMessage());
		return false
	}
	iObj = iObjResult.getOutput();
	inspTypeResult = aa.inspection.getInspectionType(iObj.getInspection().getInspectionGroup(), iObj.getInspectionType());
	if (!inspTypeResult.getSuccess()) {
		logDebug("**INFO retrieving inspection Type " + inspTypeResult.getErrorMessage());
		return false
	}
	inspTypeArr = inspTypeResult.getOutput();
	if (inspTypeArr == null || inspTypeArr.length == 0) {
		logDebug("**INFO no inspection type found");
		return false
	}
	inspType = inspTypeArr[0];
	inspSeq = inspType.getSequenceNumber();
	inspSchedDate = iObj.getScheduledDate().getYear() + "-" + iObj.getScheduledDate().getMonth() + "-" + iObj.getScheduledDate().getDayOfMonth();
	logDebug(inspSchedDate);
	iout = aa.inspection.autoAssignInspector(capId.getID1(), capId.getID2(), capId.getID3(), inspSeq, inspSchedDate);
	if (!iout.getSuccess()) {
		logDebug("**INFO retrieving auto assign inspector " + iout.getErrorMessage());
		return false
	}
	inspectorArr = iout.getOutput();
	if (inspectorArr == null || inspectorArr.length == 0) {
		logDebug("**INFO no auto-assign inspector found");
		return false
	}
	inspectorObj = inspectorArr[0];
	iObj.setInspector(inspectorObj);
	assignResult = aa.inspection.editInspection(iObj);
	if (!assignResult.getSuccess()) {
		logDebug("**INFO re-assigning inspection " + assignResult.getErrorMessage());
		return false
	} else
		logDebug("Successfully reassigned inspection " + iObj.getInspectionType() + " to user " + inspectorObj.getUserID())
}

function updateTaskHandleDisposition(taskNamee, newStatus) {
	var taskResult = aa.workflow.getTask(capId, taskNamee);
	var currentTask = taskResult.getOutput();
	if (currentTask != null && currentTask != "") {
		currentTask.setDisposition(newStatus);
		var updateResult = aa.workflow.handleDisposition(currentTask.getTaskItem(), capId);
	}
}

/**
 * calculate inspection range value.
  * @param {string}  costRangeType (days, months, years) 
  * @param {number}  costRange.
  * @return {array} costRange per days.  
*/
function calculateUnifiedRange(costRangeType, costRange) {
		if (costRangeType.equalsIgnoreCase("months")) {
			return 30 * costRange;
		} else if (costRangeType.equalsIgnoreCase("days")) {
			return costRange;
		}
		else if (costRangeType.equalsIgnoreCase("years")) {
			return 365*costRange ;
		}
	}

function schedInspection(inspecType, sameInspector, rangeType, rangeValue, inspectionCopyComment) {

	
	if (typeof inspectionCopyComment === 'undefined' || inspectionCopyComment == null) {
		inspectionCopyComment = false;
	}

	var currInspector = null;
	var scheduledDate =  null ;
	var inspectionDate = null; 

		if (inspId != null) {
			var inspResultObj = aa.inspection.getInspection(capId, inspId);
			if (inspResultObj.getSuccess()) {
				var currentInp = inspResultObj.getOutput();
				if(sameInspector) 
				{
				currInspector = currentInp.getInspector().getGaUserID();
				}
				if(currentInp.getScheduledDate() != null )
					{
					//'getScheduledDate().getDayOfMonth()' returns = 'number of days' minus 1 day;
					scheduledDate = dateFormatted(currentInp.getScheduledDate().getMonth(),currentInp.getScheduledDate().getDayOfMonth()+1,currentInp.getScheduledDate().getYear(),  "MM/DD/YYYY" ) ;
					}
				if(currentInp.getScheduledDate() != null )
					{
					inspectionDate = dateFormatted(currentInp.getInspectionDate().getMonth(),currentInp.getInspectionDate().getDayOfMonth(),currentInp.getInspectionDate().getYear(),  "MM/DD/YYYY" ) ;
					}	
			}
			else {
         logDebug("Error in aa.inspection.getInspection API. Message = " + inspResultObj.getErrorMsg());
            }
		}

	var now = new Date(aa.util.now());
	logDebug("rangeType ='" +rangeType + "' rangeValue = '" +rangeValue + "'") ;
	var inspRangeDays = calculateUnifiedRange(rangeType, rangeValue);
	logDebug("inspRangeDays =" +inspRangeDays) ;
	
	var baseDate = null ; 

	if(!isEmptyOrNull(rules.action.basedOnScheduledDate) && rules.action.basedOnScheduledDate)
	{
	    baseDate  = scheduledDate;
	    logDebug("baseDate = '" +baseDate + "' basedOnScheduledDate = " + rules.action.basedOnScheduledDate )
	} 
	else if(!isEmptyOrNull(rules.action.basedOnResultDate) && rules.action.basedOnResultDate)
		{
		baseDate = inspectionDate;
		logDebug("baseDate = '" +baseDate + "' basedOnResultDate = " + rules.action.basedOnResultDate )
		}
	
	if(baseDate !=null )
		{
		// The getDateDiff() method returns menus value if the 'base date' is greater than the 'current date'.
		var diffDate = getDateDiff(baseDate) ;
		logDebug("Differnce date between 'base date' and 'current date' = " + diffDate ) ;
		inspRangeDays = parseInt(inspRangeDays) + parseInt((parseInt(diffDate) *-1)) ;
		}
	logDebug("Schedule a new inspection after ='" + inspRangeDays + "' days" ) ;
	var newInspComments = null;
	if (inspectionCopyComment && typeof inspComment !== 'undefined' && inspComment != "") {
		newInspComments = inspComment;
	}
	//re-sched inspection
	
	if (currInspector != null) {
		scheduleInspection(inspecType, parseInt(inspRangeDays), currInspector, null, newInspComments);
	} else {
		scheduleInspection(inspecType, parseInt(inspRangeDays), null, null, newInspComments);

		var inspects = aa.inspection.getInspections(capId);
		if (inspects.getSuccess()) {
			inspects = inspects.getOutput();
			inspects.sort(compareInspDateDesc);

			if (inspects != null && inspects.length > 0 && inspects[0] != null) {
				//assign inspector for last-sched inspection
				try {
					autoAssignInspectionLocal(inspects[inspects.length - 1].getIdNumber());
				} catch (ex) {
					logDebug(ex);
				}
			}//inspects !null
		}//success
	}
}
