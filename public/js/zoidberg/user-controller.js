angular.module("zoidberg").controller("UserCtrl",["$scope","$http",function(i,t){i.notifications=[],t.get("/zoidberg/users/notifications").success(function(t){i.notifications=t,i.newNotifications=[],i.GetNotifications=function(){return i.notifications},i.GetNewNotifications=function(){if(i.newNotifications.length>0)return i.newNotifications;for(var t=[],n=0;n<i.notifications.length;n++)i.notifications[n].read||t.push(i.notifications[n]);return i.newNotifications=t,t},i.Read=function(t){t.read=!0,i.newNotifications=i.newNotifications.filter(function(i){return!i.read})}})}]);