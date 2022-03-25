{
"EnvHealth/Land Use/*/Renewal": {
    "WorkflowTaskUpdateAfter": [
      {
        "metadata": {
          "description": "Updates parent EnvHealth record",
          "operators": {}
        },
        "criteria": {
 		  "disabled": false,
          "balanceAllowed": false,
         "task": [
            "Permit Renewal" 
          ],
          "status": [
            "Renewed"  
          ]
        },
        "preScript": "",
        "action": {
          "issuedRecordStatus": "ACTIVE MAINTENANCE",
          "issuedExpirationStatus": "Active",
          "issuedLPStatus": "A",
		  "expirationType":"Years",
          "expirationPeriod": 1,
          "customExpirationFunction": "",
          "copyComponents": []
        },
        "postScript": "clearNotificationInfo"
      }
    ],
    "ConvertToRealCAPAfter": [
      {
        "metadata": {
          "description": "Sets the license status to Active to disable the ACA renewal button",
          "operators": {}
        },
        "criteria": {
		  "disabled": false,
          "balanceAllowed": false,
          "recordType": "EnvHealth/Land Use/*/Renewal"
        },
        "preScript": "",
        "action": {
          "issuedRecordStatus": "ACTIVE MAINTENANCE",
          "issuedExpirationStatus": "Active",
          "issuedLPStatus": "A",
          "expirationType": "Years",
          "expirationPeriod": 1,
          "customExpirationFunction": "",
          "copyComponents": []
        },
        "postScript": "clearNotificationInfo"
      }
    ]
  }
}