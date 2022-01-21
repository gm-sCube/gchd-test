{
  "EnvHealth/Food Retail/*/Application": {
    "WorkflowTaskUpdateAfter": [
      {
        "metadata": {
          "description": "Issues a Food Retail Permit.",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "balanceAllowed": false,
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "parentLicense": "EnvHealth/Food Retail/*/Permit",
          "issuedStatus": "Pending",
          "copyCustomFields": [
            "ALL"
          ],
          "copyCustomTables": [
            "ALL"
          ],
          "expirationType": "Expiration Code",
          "expirationPeriod": "EH_GENERAL",
          "copyContacts": [
            "ALL"
          ],
          "createLP": true,
          "licenseTable": "",
          "refLPType": "Food Facility",
          "contactType": "Applicant",
          "contactAddressType": "Mailing",
          "copyRecordName": true,
          "copyRecordDetails": true
        },
        "postScript": ""
      }
    ]
  }
}