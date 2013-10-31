/*!
 *  landscape-modeler-js
 *  @version 0.0.1
 *  @author Tom Wayson <twayson@esri.com> (http://tomwayson.com)
 *
 *  A JavaScript web application for designing, running, and saving weighted overlay models using the Esri ArcGIS API for JavaScript and ArcGIS Server image services.
 */
define(["dojo/_base/declare","dojo/_base/array","dojo/on","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","esri/dijit/BasemapGallery","esri/dijit/Geocoder","dojo/text!./templates/MapControls.html","dojo/i18n!./nls/resources","dijit/TitlePane","dijit/layout/ContentPane"],function(a,b,c,d,e,f,g,h,i,j){return a([d,e,f],{templateString:i,i18n:j,baseClass:"mdlrMapControls",_setMapAttr:function(a){var b=this;this.map=a,this.basemapGallery&&this.basemapGallery.destroy(),this.basemapGallery=new g({showArcGISBasemaps:!0,map:this.map},this.basemapGalleryNode),this.basemapGallery.startup(),this.own(c(this.basemapGallery,"SelectionChange",function(){b.updateMapBasemapInfo(),b.basemapGalleryTitlePane.toggle()})),this.geocoder&&this.geocoder.destroy(),this.geocoder=new h({map:this.map},this.geocoderNode),this.geocoder.startup()},updateMapBasemapInfo:function(){var a=this.basemapGallery.getSelected(),c=[];a&&(b.forEach(this.map.layerIds,function(d){var e=this.map.getLayer(d);b.some(a.layers,function(a){return a.url===e.url})&&c.push(e.id)},this),c.length>0&&(this.map.basemapLayerIds=c))}})});