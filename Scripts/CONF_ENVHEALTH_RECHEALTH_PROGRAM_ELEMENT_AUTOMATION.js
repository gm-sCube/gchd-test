{
	"EnvHealth/Rec Health/Spa/*": {
		"WorkflowTaskUpdateAfter": [
			{
				"metadata": {
					"description": "To automate the fee by program element",
					"operators": {}
				},
				"preScript": "",
				"criteria": {
					"task": [
						"Application Review"
					],
					"status": [
						"Completed"
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
		]
	},
	"EnvHealth/Rec Health/Spa/Renewal": {
		"ConvertToRealCAPAfter": [
			{
				"metadata": {
					"description": "To automate the fee by program element",
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
	"EnvHealth/Rec Health/Pool/*": {
		"WorkflowTaskUpdateAfter": [
			{
				"metadata": {
					"description": "To automate the fee by program element",
					"operators": {}
				},
				"preScript": "",
				"criteria": {
					"task": [
						"Application Review"
					],
					"status": [
						"Completed"
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
		]
	},
	"EnvHealth/Rec Health/Pool/Renewal": {
		"ConvertToRealCAPAfter": [
			{
				"metadata": {
					"description": "To automate the fee by program element",
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