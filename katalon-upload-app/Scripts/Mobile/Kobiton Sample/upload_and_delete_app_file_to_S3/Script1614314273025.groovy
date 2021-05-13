import internal.GlobalVariable
import kobiton.AccountObject

//Set Kobiton Accoun in default Profile
AccountObject account = new AccountObject(GlobalVariable.G_kobitonUsername, GlobalVariable.G_kobitonAPIKey, 
  GlobalVariable.G_kobitonAPIUrl, GlobalVariable.G_kobitonServerUrl)
CustomKeywords.'kobiton.AppRepoHelper.uploadFileToKobitonPortal'(FilePath, FileName, account)
CustomKeywords.'kobiton.AppRepoHelper.removeAppAndAppVersion'(GlobalVariable.G_appId, GlobalVariable.G_appVersion, account)

