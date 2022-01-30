{
"EnvHealth/Food Retail/*/Renewal": {
    "WorkflowTaskUpdateAfter": [
      {
        "metadata": {
          "description": "Updates parent EnvHealth record - used for back office",
          "operators": {}
        },
        "criteria": {
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
		  "expirationType":"Expiration Code",
          "expirationPeriod": "",
          "customExpirationFunction": "",
          "copyComponents": []
        },
        "postScript": ""
      }
    ],

    "ConvertToRealCapAfter": [
      {
        "metadata": {
          "description": "Sets the license status to Active to disable renewal button",
          "operators": {}
        },
        "criteria": {
          "recordType": "EnvHealth/Food Retail/*/Renewal"
        },
        "preScript": "",
        "action": {
          "issuedRecordStatus": "Active",
          "issuedExpirationStatus": "Active",
          "issuedLPStatus": "A",
		  "expirationType":"Expiration Code",
          "expirationPeriod": "",
          "customExpirationFunction": "",
          "copyComponents": []
        },
        "postScript": ""
      }
    ]
  }
}