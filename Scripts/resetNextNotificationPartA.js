/*
Part A
while not eof
if record balance is 0.00 or 50.00 and Next Notification is not empty (Exempt, or non-exempt and payment was made before 6/1, or Late Fee was credited)
	set Next Notification == ""
	set Next Notification Date == ""
	set License Expiration Status to Active
endif

Part B
if record balance is 50.00 and Next Notification is empty (2nd notification was sent and there are no oustanding permitting fees)
	set Next Notification == ""
	set Next Notification Date == ""
	set License Expiration Status to Active
endif


*/



	/*------------------------------------------------------------------------------------------------------/
	| Program: inspectionActivityNotificationBatch.js  Trigger: Batch
	| Client: LLU

	| Version 1.0 - Base Version. 03/06/2019
	|
	/------------------------------------------------------------------------------------------------------*/
	/*------------------------------------------------------------------------------------------------------/
	|
	| START: USER CONFIGURABLE PARAMETERS
	|
	/------------------------------------------------------------------------------------------------------*/


var batchProcess = "Remove Incorrect Fees"
var publicUser = "";
var useAppSpecificGroupName = false;
var currentUserID = aa.getAuditID();
aa.env.setValue("CurrentUserID", "ADMIN");
if (currentUserID != null) {
	systemUserObj = aa.person.getUser(currentUserID).getOutput(); // Current User Object
}
var br = "\n";
showDebug = true;
showMessage = true;
var startDate = new Date();
var startTime = startDate.getTime();
emailText = "";

function getScriptText(vScriptName, servProvCode, useProductScripts) {
	if (!servProvCode)
		servProvCode = aa.getServiceProviderCode();
	vScriptName = vScriptName.toUpperCase();
	var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
	try {
		if (useProductScripts) {
			var emseScript = emseBiz.getMasterScript(aa.getServiceProviderCode(), vScriptName);
		} else {
			var emseScript = emseBiz.getScriptByPK(aa.getServiceProviderCode(), vScriptName, "ADMIN");
		}
		return emseScript.getScriptText() + "";
	} catch (err) {
		return "";
	}
}

eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS"));
eval(getScriptText("INCLUDES_ACCELA_GLOBALS"));
eval(getScriptText("INCLUDES_CUSTOM"));
eval(getScriptText("INCLUDES_RECORD"));
eval(getScriptText("INCLUDES_SYSTEM"));
eval(getScriptText("INCLUDES_BASEBATCH"));

Batch.prototype.execute = function() {
	// try {
		//execute main()
		processRecords();

	// } catch (e) {
		// this.log("ERROR: ", e + "");
	// }

}

//logDebug("run()")	
run();

aa.env.setValue("ScriptReturnCode", "0");
aa.env.setValue("ScriptReturnMessage", message);
if (showDebug)
	aa.env.setValue("ScriptReturnMessage", debug);


function processRecords() {

var foodCount = 0;
var recCount = 0;
var instCount = 0;


  foodCount = 0;
  // get the permit records
  var myResult = aa.cap.getByAppType('EnvHealth','Food Retail')
  // var myResult = aa.cap.getCapIDsByAppSpecificInfoField('Next Notification','2nd Expiration Notice');
  // var myResult = aa.cap.getCapIDList();
  if (myResult.getSuccess()) {
    var departments = myResult.getOutput();
	logDebug("food permits " + departments.length);
	// logDebug(departments[1]);
	// return;

    // loop through all the departments
    for (var d in departments ) {
	  var capDetails = aa.cap.getCapDetail(departments[d].getCapID()).getOutput();
	  if (capDetails == null || typeof capDetails === 'undefined') continue;
	  s1 = new Record(departments[d].getCapID());
	  // logDebugObject(s1);
	  myASI = s1.getAllASI(false);
	  myNextNotification = myASI["Next Notification"];
	  if(myNextNotification == null || myNextNotification == '') continue;
	  myBalance = s1.getBalance();
	  if(myBalance == 50 || myBalance == 0) {
		  // logDebug(myBalance + s1);
		  foodCount ++;
		  // break;
	  }
	  // logDebug(s1);
	}
 
  }else{
    logDebug("no restaurants");
  }

  // get the permit records
  recCount = 0;
  var myResult = aa.cap.getByAppType('EnvHealth','Rec Health')
  // var myResult = aa.cap.getCapIDsByAppSpecificInfoField('Next Notification','Expiration Notice');
  // var myResult = aa.cap.getCapIDList();
  if (myResult.getSuccess()) {
    var departments = myResult.getOutput();
	logDebug("rec health permits " + departments.length);
	// logDebug(departments[1]);
	// return;

    // loop through all the departments
    for (var d in departments ) {
	  var capDetails = aa.cap.getCapDetail(departments[d].getCapID()).getOutput();
	  if (capDetails == null || typeof capDetails === 'undefined') continue;
	  s1 = new Record(departments[d].getCapID());
	  // logDebugObject(s1);
	  myASI = s1.getAllASI(false);
	  myNextNotification = myASI["Next Notification"];
	  if(myNextNotification == null || myNextNotification == '') continue;
	  myBalance = s1.getBalance();
	  if(myBalance == 50 || myBalance == 0) {
		  // logDebug(myBalance + s1);
		  recCount ++;
		  // break;
	  }
	  // logDebug(s1);
	}
 
  }else{
    logDebug("no rec health");
  }

  // get the permit records
  instCount = 0;
  var myResult = aa.cap.getByAppType('EnvHealth','Institutions')
  // var myResult = aa.cap.getCapIDsByAppSpecificInfoField('Next Notification','');
  // var myResult = aa.cap.getCapIDList();
  if (myResult.getSuccess()) {
    var departments = myResult.getOutput();
	logDebug("institutions permits " + departments.length);
	// logDebug(departments[1]);
	// return;

    // loop through all the departments
    for (var d in departments ) {
	  var capDetails = aa.cap.getCapDetail(departments[d].getCapID()).getOutput();
	  if (capDetails == null || typeof capDetails === 'undefined') continue;
	  s1 = new Record(departments[d].getCapID());
	  // logDebugObject(s1);
	  myASI = s1.getAllASI(false);
	  myNextNotification = myASI["Next Notification"];
	  if(myNextNotification == null || myNextNotification == '') continue;
	  myBalance = s1.getBalance();
	  if(myBalance == 50 || myBalance == 0) {
		  logDebug(myBalance + s1);
		  instCount ++;
	  }
	  // logDebug(s1);
	}
 
  }else{
    logDebug("no institutions");
  }
var myTotalRecCount =  foodCount+recCount+instCount;
logDebug("Food to process " + foodCount);
logDebug("Rec Health to process " + recCount);
logDebug("Insitutions to process " + instCount);
logDebug("Records to process " + myTotalRecCount);



	/*------------------------------------------------------------------------------------------------------/
	| <===========END=Main=Loop================>
	/-----------------------------------------------------------------------------------------------------*/

}

function voidAllFees(pCapId) {
	// Process Invoiced Fees
	var getFeeResult = aa.fee.getFeeItems(pCapId, null, "INVOICED");
	if (getFeeResult.getSuccess()) {
		var feeList = getFeeResult.getOutput();
		for (feeNum in feeList) {
			if (feeList[feeNum].getFeeitemStatus().equals("INVOICED")) {
				var feeSeq = feeList[feeNum].getFeeSeqNbr();
				// Check if there has been a payment
				var vFeePayment = false;
				var pfResult = aa.finance.getPaymentFeeItems(pCapId, null);
				if (pfResult.getSuccess()) {
					var pfObj = pfResult.getOutput();
					for (ij in pfObj) {
						if (feeSeq == pfObj[ij].getFeeSeqNbr()) {
							// Has payment, skip and do not void
							vFeePayment = true;
						}
					}
				}
				// Only void non-paid fees
				if (vFeePayment == false) {
					var editResult = aa.finance.voidFeeItem(pCapId, feeSeq);
					if (editResult.getSuccess()) {
						logDebug("Voided existing Fee Item: " + feeList[feeNum].getFeeCod());
					} else {
						logDebug("**ERROR: Voiding fee item (" + feeList[feeNum].getFeeCod() + "): " + editResult.getErrorMessage());
						break;
					}
					//Invoice the void creating a "Credit"
					var cfeeSeqArray = new Array();
					var paymentPeriodArray = new Array();
					cfeeSeqArray.push(feeSeq);
					paymentPeriodArray.push(feeSeq.period);
					var invoiceResult_L = aa.finance.createInvoice(pCapId, cfeeSeqArray, paymentPeriodArray);
					if (!invoiceResult_L.getSuccess()) {
						logDebug("**ERROR: Invoicing the fee items voided " + thisFee.code + " was not successful.  Reason: " + invoiceResult_L.getErrorMessage());
						return false;
					}
				}
			}
			if (feeList[feeNum].getFeeitemStatus().equals("VOIDED")) {
				var feeSeq = feeList[feeNum].getFeeSeqNbr();
				//Invoice the void creating a "Credit"
				var cfeeSeqArray = new Array();
				var paymentPeriodArray = new Array();
				cfeeSeqArray.push(feeSeq);
				paymentPeriodArray.push(feeSeq.period);
				var invoiceResult_L = aa.finance.createInvoice(pCapId, cfeeSeqArray, paymentPeriodArray);
				if (!invoiceResult_L.getSuccess()) {
					logDebug("**ERROR: Invoicing the fee items voided " + thisFee.code + " was not successful.  Reason: " + invoiceResult_L.getErrorMessage());
					return false;
				}
			}
			if (feeList[feeNum].getFeeitemStatus().equals("CREDITED")) {
				logDebug("Credited fee " + feeList[feeNum].getFeeCod() + " found, not voided");
			}
		}
	} else {
		logDebug("**ERROR: getting invoiced fee items: " + getFeeResult.getErrorMessage())
	}
}


function clearNextNotification(capId) {
	/*
	script to clear Next Notification and Next Notification Date
	*/
	var parentCapId = capId; 
	var parentCapIdStr = parentCapId.getCustomID();
	logDebug("Parent cap: " + parentCapIdStr);
	editAppSpecific("Next Notification","",parentCapId);
	editAppSpecific("Next Notification Date","",parentCapId);
}