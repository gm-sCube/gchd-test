{
"EnvHealth/Institutions/*/Renewal": {
    "WorkflowTaskUpdateAfter": [
      {
        "metadata": {
          "description": "Updates parent EnvHealth Institutions record",
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
          "issuedRecordStatus": "Active",
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
          "recordType": "EnvHealth/Institutions/*/Renewal"
        },
        "preScript": "",
        "action": {
          "issuedRecordStatus": "Active",
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