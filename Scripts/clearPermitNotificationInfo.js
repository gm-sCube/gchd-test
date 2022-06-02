/*
script to clear Next Notification and Next Notification Date
*/
var parentCapId = capId; 
var parentCapIdStr = parentCapId.getCustomID();
logDebug("Parent cap: " + parentCapIdStr);
editAppSpecific("Next Notification","",parentCapId);
editAppSpecific("Next Notification Date","",parentCapId);
