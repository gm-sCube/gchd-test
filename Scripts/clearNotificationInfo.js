/*
script to clear Next Notification and Next Notification Date
*/
var parentCapId = getRenewalParentCapID(itemCapId); // This is renewal cap
var parentCapIdStr = parentCapId.getCustomID();
logDebug("Parent cap: " + parentCapIdStr);
editAppSpecific("Next Notification","",parentCapId);
editAppSpecific("Next Notification Date","",parentCapId);
