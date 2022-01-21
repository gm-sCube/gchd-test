{
	"EnvHealth/Institutions/Residential Care/*": {
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
					"assessFees": [
						{
							"feeSchedule": "EH_RESIDENTIAL_CARE",
							"feeQuantity": 1,
							"feeInvoice": "Y",
							"feePeriod": "FINAL"
						}
					]
				}
			}
		]
	},
	"EnvHealth/Institutions/Residential Care/Renewal": {
		"ConvertToRealCAPAfter": [
			{
				"metadata": {
					"description": "To automate the fee by program element",
					"operators": {}
				},
				"criteria": {},
				"preScript": "",
				"action": {
					"assessFees": [
						{
							"feeSchedule": "EH_RESIDENTIAL_CARE",
							"feeQuantity": 1,
							"feeInvoice": "Y",
							"feePeriod": "FINAL"
						}
					]
				}
			}
		]
	},
	"EnvHealth/Institutions/Correctional Facility/*": {
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
					"assessFees": [
						{
							"feeSchedule": "EH_CORRECTIONAL_FACILITY",
							"feeQuantity": 1,
							"feeInvoice": "Y",
							"feePeriod": "FINAL"
						}
					]
				}
			}
		]
	},
	"EnvHealth/Institutions/Correctional Facility/Renewal": {
		"ConvertToRealCAPAfter": [
			{
				"metadata": {
					"description": "To automate the fee by program element",
					"operators": {}
				},
				"criteria": {},
				"preScript": "",
				"action": {
					"assessFees": [
						{
							"feeSchedule": "EH_CORRECTIONAL_FACILITY",
							"feeQuantity": 1,
							"feeInvoice": "Y",
							"feePeriod": "FINAL"
						}
					]
				}
			}
		]
	},
	"EnvHealth/Institutions/Child Day Care/*": {
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
					"assessFees": [
						{
							"feeSchedule": "EH_CHILD_DAY_CARE",
							"feeQuantity": 1,
							"feeInvoice": "Y",
							"feePeriod": "FINAL"
						}
					]
				}
			}
		]
	},
	"EnvHealth/Institutions/Child Day Care/Renewal": {
		"ConvertToRealCAPAfter": [
			{
				"metadata": {
					"description": "To automate the fee by program element",
					"operators": {}
				},
				"criteria": {},
				"preScript": "",
				"action": {
					"assessFees": [
						{
							"feeSchedule": "EH_CHILD_DAY_CARE",
							"feeQuantity": 1,
							"feeInvoice": "Y",
							"feePeriod": "FINAL"
						}
					]
				}
			}
		]
	},
	"EnvHealth/Institutions/Educational Building Care/*": {
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
					"assessFees": [
						{
							"feeSchedule": "EH_EDUCATIONAL_BUILDING",
							"feeQuantity": 1,
							"feeInvoice": "Y",
							"feePeriod": "FINAL"
						}
					]
				}
			}
		]
	},
	"EnvHealth/Institutions/Educational Building Care/Renewal": {
		"ConvertToRealCAPAfter": [
			{
				"metadata": {
					"description": "To automate the fee by program element",
					"operators": {}
				},
				"criteria": {},
				"preScript": "",
				"action": {
					"assessFees": [
						{
							"feeSchedule": "EH_EDUCATIONAL_BUILDING",
							"feeQuantity": 1,
							"feeInvoice": "Y",
							"feePeriod": "FINAL"
						}
					]
				}
			}
		]
	},
	"EnvHealth/Institutions/Nursing Home/*": {
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
					"assessFees": [
						{
							"feeSchedule": "EH_NURSING_HOME",
							"feeQuantity": 1,
							"feeInvoice": "Y",
							"feePeriod": "FINAL"
						}
					]
				}
			}
		]
	},
	"EnvHealth/Institutions/Nursing Home/Renewal": {
		"ConvertToRealCAPAfter": [
			{
				"metadata": {
					"description": "To automate the fee by program element",
					"operators": {}
				},
				"criteria": {},
				"preScript": "",
				"action": {
					"assessFees": [
						{
							"feeSchedule": "EH_NURSING_HOME",
							"feeQuantity": 1,
							"feeInvoice": "Y",
							"feePeriod": "FINAL"
						}
					]
				}
			}
		]
	},
	"EnvHealth/Institutions/Adult Day Care/*": {
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
					"assessFees": [
						{
							"feeSchedule": "EH_ADULT_DAY_CARE",
							"feeQuantity": 1,
							"feeInvoice": "Y",
							"feePeriod": "FINAL"
						}
					]
				}
			}
		]
	},
	"EnvHealth/Institutions/Adult Day Care/Renewal": {
		"ConvertToRealCAPAfter": [
			{
				"metadata": {
					"description": "To automate the fee by program element",
					"operators": {}
				},
				"criteria": {},
				"preScript": "",
				"action": {
					"assessFees": [
						{
							"feeSchedule": "EH_ADULT_DAY_CARE",
							"feeQuantity": 1,
							"feeInvoice": "Y",
							"feePeriod": "FINAL"
						}
					]
				}
			}
		]
	}
}