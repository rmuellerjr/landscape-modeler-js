/*!
 *  landscape-modeler-js
 *  @version 0.0.1
 *  @author Tom Wayson <twayson@esri.com> (http://tomwayson.com)
 *
 *  A JavaScript web application for designing, running, and saving weighted overlay models using the Esri ArcGIS API for JavaScript and ArcGIS Server image services.
 */
define(["dojo/_base/lang","dojo/_base/json","dojo/_base/url","dojo/cookie","dojo/Deferred","dojo/io-query","esri/IdentityManager"],function(a,b,c,d,e,f,g){var h={portal:"http://www.arcgis.com",popupCallbackPage:window.location.protocol+"//"+window.location.host+window.location.pathname.replace(/\/[^\/]+$/,"")+"/oauth-callback.html",init:function(b){a.mixin(this,b),this.portalUrl=this.portal+"/sharing/rest",this.checkOAuthResponse(window.location.href,!0),this.checkCookie(),this.overrideIdentityManager()},isSignedIn:function(){return!!g.findCredential(this.portalUrl)},signIn:function(){var a=this.deferred=new e,b={client_id:this.appId,response_type:"token",expiration:this.expiration,redirect_uri:this.popup?this.popupCallbackPage:window.location.href.replace(/#.*$/,"")},c=this.portal.replace(/^http:/i,"https:")+"/sharing/oauth2/authorize?"+f.objectToQuery(b);return this.popup?window.open(c,"esrioauth","width=480,height=320,location=yes,status=yes,scrollbars=yes"):window.location=c,a},signOut:function(a){d("arcgis_auth",null,{expires:-1,path:"/",domain:document.domain}),a||window.location.reload()},checkOAuthResponse:function(a,c){var e=this.parseFragment(a);if(e)if(c&&(window.location.hash=""),e.error){var f=new Error(e.error);f.details=[e.error_description],this.deferred&&this.deferred.reject(f)}else{var g=this.registerToken(e);e.persist&&(d("arcgis_auth",b.toJson(e),{expires:new Date(e.expires_at),path:"/",domain:document.domain}),console.log("[Cookie] Write: ",d("arcgis_auth"))),this.deferred&&this.deferred.resolve(g)}},checkCookie:function(){var a=d("arcgis_auth");if(a){console.log("[Cookie] Read: ",a);var c=b.fromJson(a);this.registerToken(c)}},registerToken:function(a){g.registerToken({server:this.portalUrl,userId:a.username,token:a.access_token,expires:a.expires_at,ssl:a.ssl});var b=g.findCredential(this.portalUrl,a.username);return console.log("Token registered with Identity Manager: ",b),b},parseFragment:function(a){var b=new c(a),d=b.fragment?f.queryToObject(b.fragment):null;return d?(d.access_token?(console.log("[OAuth Response]: ",d),d.expires_in=Number(d.expires_in),d.expires_at=(new Date).getTime()+1e3*d.expires_in,d.ssl="true"===d.ssl):d.error&&console.log("[OAuth Error]: ",d.error," - ",d.error_description),d):void 0},overrideIdentityManager:function(){var a=g.signIn,b=this;g.signIn=function(c,d){return-1!==d.server.indexOf(".arcgis.com")?b.signIn():a.apply(this,arguments)}}};return window.OAuthHelper=h,h});