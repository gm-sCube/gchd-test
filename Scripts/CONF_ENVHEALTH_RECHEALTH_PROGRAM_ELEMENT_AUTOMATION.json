{
	"EnvHealth/Rec Health/Spa/Permit": {
		"WorkflowTaskUpdateAfter": [
			{
				"metadata": {
					"description": "To automate the fee by program element",
					"operators": {}
				},
				"preScript": "",
				"criteria": {
					"task": [
						"Permit Status"
					],
					"status": [
						"Invoice Fees"
					]
				},
				"action": {
					"assessFees": {
						"feeSchedule": "EH_SPA",
						"feeQuantity": 1,
						"feeInvoice": "Y",
						"feePeriod": "FINAL"
					}
				}
			}
		],
		"AnnualRenewal": [
			{
				"metadata": {
					"description": "To assess and invoice the fees when sending notifications",
					"operators": {}
				},
				"criteria": {},
				"preScript": "",
				"action": {
					"assessFees": {
						"feeSchedule": "EH_SPA",
						"feeQuantity": 1,
						"feeInvoice": "Y",
						"feePeriod": "FINAL"
					}
				}
			}
		]
	},
	"EnvHealth/Rec Health/Pool/Permit": {
		"WorkflowTaskUpdateAfter": [
			{
				"metadata": {
					"description": "To automate the fee by program element",
					"operators": {}
				},
				"preScript": "",
				"criteria": {
					"task": [
						"Permit Status"
					],
					"status": [
						"Invoice Fees"
					]
				},
				"action": {
					"assessFees": {
						"feeSchedule": "EH_POOL",
						"feeQuantity": 1,
						"feeInvoice": "Y",
						"feePeriod": "FINAL"
					}
				}
			}
		],
		"AnnualRenewal": [
			{
				"metadata": {
					"description": "To assess and invoice the fees when sending notifications",
					"operators": {}
				},
				"criteria": {},
				"preScript": "",
				"action": {
					"assessFees": {
						"feeSchedule": "EH_POOL",
						"feeQuantity": 1,
						"feeInvoice": "Y",
						"feePeriod": "FINAL"
					}
				}
			}
		]
	}
}