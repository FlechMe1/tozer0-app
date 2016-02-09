//
var leaderboardId = "CgkI58nxs68REAIQAA";
var achievementId1 = "CgkI58nxs68REAIQAA";
var achievementId2 = "CgkI58nxs68REAIQAg";
var achievementId3 = "CgkI58nxs68REAIQAw";
var achievementId4 = "CgkI58nxs68REAIQBA";
var achievementId5 = "CgkI58nxs68REAIQBQ";
var achievementId5 = "CgkI58nxs68REAIQBg";

//
document.addEventListener("deviceready", function(){
    window.game.setUp();

    //callback
    window.game.onLoginSucceeded = function(result) {
        var playerDetail = result;
        alert('onLoginSucceeded: ' + playerDetail['playerId'] + ' ' + playerDetail['playerDisplayName']);
    };
    window.game.onLoginFailed = function() {
        alert('onLoginFailed');
    };
    //
    window.game.onSubmitScoreSucceeded = function() {
        alert('onSubmitScoreSucceeded');
    };
    window.game.onSubmitScoreFailed = function() {
        alert('onSubmitScoreFailed');
    };
    window.game.onGetPlayerScoreSucceeded = function(result) {
        var playerScore = result;
        alert('onGetPlayerScoreSucceeded: ' + playerScore);
    };
    window.game.onGetPlayerScoreFailed = function() {
        alert('onGetPlayerScoreFailed');
    };
    //
    window.game.onUnlockAchievementSucceeded = function() {
        alert('onUnlockAchievementSucceeded');
    };
    window.game.onUnlockAchievementFailed = function() {
        alert('onUnlockAchievementFailed');
    };
    window.game.onIncrementAchievementSucceeded = function() {
        alert('onIncrementAchievementSucceeded');
    };
    window.game.onIncrementAchievementFailed = function() {
        alert('onIncrementAchievementFailed');
    };
    window.game.onResetAchievementsSucceeded = function() {
        alert('onResetAchievementsSucceeded');
    };
    window.game.onResetAchievementsFailed = function() {
        alert('onResetAchievementsFailed');
    };
    //
    window.game.onGetPlayerImageSucceeded = function(result) {
        var playerImageUrl = result;
        alert('onGetPlayerImageSucceeded: ' + playerImageUrl);
    };
    window.game.onGetPlayerImageFailed = function() {
        alert('onGetPlayerImageFailed');
    };
}, false);

//
window.game.login();
window.game.logout();
alert(window.game.isLoggedIn());

//
window.game.submitScore(leaderboardId, 5);//leaderboardId, score
window.game.showLeaderboard(leaderboardId);
window.game.showLeaderboards();
window.game.getPlayerScore(leaderboardId);

//
window.game.unlockAchievement(achievementId1);
window.game.unlockAchievement(achievementId2);
window.game.unlockAchievement(achievementId3);
window.game.unlockAchievement(achievementId4);
window.game.unlockAchievement(achievementId5);
window.game.incrementAchievement(achievementId1, 2); //achievementId, incrementalStepOrCurrentPercent: Incremental step (android) or current percent (ios) for incremental achievement.
window.game.incrementAchievement(achievementId2, 2);
window.game.incrementAchievement(achievementId3, 2);
window.game.incrementAchievement(achievementId4, 2);
window.game.incrementAchievement(achievementId5, 2);
window.game.showAchievements();
window.game.resetAchievements();//only supported on ios

//
window.game.getPlayerImage();
