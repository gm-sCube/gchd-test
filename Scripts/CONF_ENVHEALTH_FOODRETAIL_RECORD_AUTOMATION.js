removed from environment

{
	"EnvHealth/Food Retail/*/Application": {
		"PaymentReceiveAfter": [
			{
				"metadata": {
					"description": "to automate completion of task upon payment of application fees",
					"operators": {}
				},
				"preScript": "",
				"criteria": {
					"balanceAllowed": false
				},
				"action": {
					"updateTask": [
						{
							"task": "Permit Issuance",
							"status": "Issued"
						}
					]
				},
				"postScript": ""
			}
		]
	}
}