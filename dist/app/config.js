define([],
function() {
  return {
    // app title
    appTitle: "Landscape Modeler",

    // oAuth
    oauthOptions: {
      appId: "landscapemodeler",
      portal: "https://devext.arcgis.com",
      expiration: (14 * 24 * 60), // 2 weeks, in minutes
      popup:      false
    },

    // portal
    // NOTE: portal URL comes from oAuth options above
    portalOptions: {
      // item defaults for the model
      modelItem: {
        title: "New Model"
      },
      typeKeyword: "Landscape Modeler",
      categoryTags: ['Earth & Atmosphere', 'Boundaries', 'Resources & Infrastructure',
                'Plants & Animals', 'People & Places', 'Environmental Threats  & Hazards']
    },

    // add the item id of a model to load that model at start up
    // modelItemId: "b00900b62cbd4e65a528c388bc0c7866",

    // map
    mapOptions: {
      basemap: "topo",
      center:[-122.45,37.75],
      zoom:6
    },

    // areaUint: Area unit that carts will use in reporting
    // and the conversion factor from the area unit of the image service
    areaUnit: {
      name: "Acres",
      conversionFactor: 0.000247105 // = 1 sq meter
    },

    // weighted overlay modeler
    weightedOverlayService: {
      // image service that publishes all available raster layers
      // and the raster functions that operate on them
      url: "https://landscape3dev.arcgis.com/arcgis/rest/services/Landscape_Modeler/USA_Weighted_Overlay/ImageServer",
      // options for initializing the model service
      options: {
        rasterFunctionName: "WeightedOverlay_7_1_9_colormap",
        histogramRasterFunctionName: "WeightedOverlay_7_0_9_histogram",
        rastersInFunction: 7,
        dummyRasterId: 53,
        queryParameters: {
          // NOTE: exclude Forest Fagmentation until data issue is corrected
          where: "OBJECTID <> 49",
          outFields: ["OBJECTID","Name","Title","Url","InputRanges","OutputValues","NoDataRanges","RangeLabels","NoDataRangeLabels"]
        },
        colorMapArgName: "Colormap",
        // TODO: set these somewhere else?
        colormapDefinitions: [
          {
            name: "1_9_green_yellow_red",
            colors: [
              {label: "Extremely Low", value: 1, rgb: [38,115,0]},
              {label: "Very Low", value: 2, rgb: [86,148,0]},
              {label: "Low", value: 3, rgb: [39,181,0]},
              {label: "Low Medium", value: 4, rgb: [197,219,0]},
              {label: "Medium", value: 5, rgb: [255,255,0]},
              {label: "High Medium", value: 6, rgb: [255,195,0]},
              {label: "High", value: 7, rgb: [250,142,0]},
              {label: "Very High", value: 8, rgb: [242,85,0]},
              {label: "Extremely High", value: 9, rgb: [230,0,0]}
            ]
          }, {
            name: "1_9_red_yellow_green",
            colors: [
              {label: "Extremely Low", value: 1, rgb: [230,0,0]},
              {label: "Very Low", value: 2, rgb: [242,85,0]},
              {label: "Low", value: 3, rgb: [250,142,0]},
              {label: "Low Medium", value: 4, rgb: [255,195,0]},
              {label: "Medium", value: 5, rgb: [255,255,0]},
              {label: "High Medium", value: 6, rgb: [197,219,0]},
              {label: "High", value: 7, rgb: [39,181,0]},
              {label: "Very High", value: 8, rgb: [86,148,0]},
              {label: "Extremely High", value: 9, rgb: [38,115,0]}
            ]
          }
        ]
      }
    },

    // app topics
    topics: {
      MODELER_MODEL_RUN: "/modeler/model/run",
      MODELER_SIGNOUT: "/modeler/signOut",
      CHART_FEATURETYPE_SELECTED: "/chart/featureType/selected"
    },

    // help link
    helpUrl: "http://resources.arcgis.com/en/help/landscape-modeler/",

    // proxy and utility urls
    proxyUrl: "./proxy.ashx",
    geometryServiceUrl: "http://landscapemodelerdev.arcgis.com/arcgis/rest/services/Utilities/Geometry/GeometryServer"
  };
});
