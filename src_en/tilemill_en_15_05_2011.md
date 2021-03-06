# Introduction

TileMill is a tool for cartographers to quickly and easily design maps for the web using custom data. It is built on the powerful open-source map rendering library [Mapnik](http://www.mapnik.org) - the same software [OpenStreetMap](http://www.openstreetmap.org/) and [MapQuest](http://www.mapquest.com) use to make some of their maps. TileMill is not intended to be a general-purpose cartography tool, but rather focuses on streamlining and simplifying a narrow set of use cases.

For anyone coming from a GIS or cartography background, the biggest assumption TileMill makes is the final projection - TileMill maps are always projected to ‘Web Mercator’. As the name suggests, this projection is popular with web mapping applications, thus maps created with TileMill can be displayed using the Google Maps API, OpenLayers, and a number of other projects.


TileMill can also export directly to the SQLite-based [MBTiles](http://www.mbtiles.org) file format. This format was designed to make traditional web maps available offline and is used by [Maps on a Stick](http://mapbox.com/tools/maps-stick) and the [MapBox iPad App](http://mapbox.com/ipad).

TileMill is a project of [Development Seed](http://www.developmentseed.org) and the source code is [available on GitHub](http://github.com/mapbox/tilemill).

# Basics

## GIS

If you have never worked in GIS or cartography before, there a number of basics to go over before jumping into TileMill.

GIS stands for Geographic Information System and refers to any system dealing with the recording, analysis, or display of data that is related to a location. TileMill is focused on the ‘display’ part of that definition, but does provide some tools for basic analysis. Cartography is the practice of making maps.

## Map projections

**Projections** refer to the method used for representing a three-dimensional object like the Earth on a two-dimensional surface like a sheet of paper or a computer screen. While TileMill maps are always projected as ‘Web Mercator’ you will come across data sources that use [many different projections](http://en.wikipedia.org/wiki/Map_projection).

**Coordinate systems** provide ways of describing a specific location on the earth. For example, you can describe the location of Washington, DC with its latitude and longitude approximately `(38,-77)`. Another method of describing its location might be to provide the *number of meters to Washington, DC north and west from the Equator* - and some coordinate systems do exactly that.

The **[proj4](http://trac.osgeo.org/proj/) SRS string** (spatial referencing system) combines these two concepts and provides a way to describe the projection and coordinate system of a datasource at once. For example, the [WGS84](http://en.wikipedia.org/wiki/World_Geodetic_System) proj4 SRS looks like this:

    +proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs

TileMill can generally autodetect the SRS of shapefiles and other datasources. You may need to provide an SRS string for some datasources if TileMill cannot autodetect the value.

## Zoom levels

Interactive, tiled maps are designed and rendered at a number of different scalesA zoom level is a predefined scale at which a map is rendered. OpenStreetMap, Google Maps, and most other online maps zoom levels are scaled such that the entire world fills a 256x256 pixel tile at zoom level 0, and doubles in width & height at each subsequent zoom level.

For example: at zoom level 6 you get a full view of a medium-sized country.  At zoom level 11 you’re looking at a metropolitan-region-sized area. At Zoom level 16 you’re down to a neighborhood scale.

# Interface tour

If you’ve got TileMill running on your computer, you can access the web interface in any modern web browser at [http://localhost:8889](http://localhost:8889) (by default - this address is configurable). The main TileMill screen is a project browser, and you will see a few example projects there already to give you an idea of what TileMill can do. If you click on one of the projects you will be taken to the editing interface:

![Screenshot](manual/project.png)

1. Main toolbar
2. Map preview
3. Layers list
4. Colors & fonts palette
5. Code editor

### Main toolbar

![Screenshot](manual/toolbar.png)

1. Settings button
2. Project name
3. Save button
4. Export button - export your map to a PNG image or to an MBTiles file; you can also view past exports
5. Project settings - adjust project settings including tile image format
6. Close project - returns to the main screen

### Map preview

![Screenshot](manual/map.png)

1. Map preview
2. Zoom indicator & controls
3. Full-page toggle


TileMill provides an interactive preview of the map as you are designing it. The map updates every time you save the project.

You can pan around by clicking and dragging, and zoom in and out clicking on the + and - buttons. Zooming can also be controlled with your mouse wheel when the cursor is over the map, or by holding down the Shift key and drawing a box on the map of the area you wish to zoom to. The zoom level indicator displays the current zoom level, which is useful to know when designing and checking styles.

The full-page toggle button expands the size of the preview, and collapses it back once you are in the big-preview mode.

When you save a project TileMill also saves the position and scale you were viewing the map at, so if you are only mapping a small area such as a city you won’t have to zoom in there every time you reopen the project.

### Layers list

![Screenshot](manual/tools.png)

1. Add layer button
2. Draggable area
3. Geometry icon
4. IDs and classes
5. Inspect layer data
6. Edit layer
7. Delete layer

Clicking the add layer button opens a dialog where you can choose a shapefile, KML file, GeoJSON file, or GeoTIFF to add to the project. Each layer must have one ID (indicated by the `#` prefix), and may optionally have one or more classes (indicated by a `.` prefix). These are defined when the layer is added but can be changed any time by clicking the ‘Edit layer’ icon.

A layer can be easily reordered by clicking in the striped draggable area and moving it above or below another layer. Overlapping areas of layers will be rendered such that the highest layer on the list will cover layers beneath it.

For the purposes of styling, a layer can be one of four types of geometries - point, line, polygon, or raster. This is indicated by the geometry icon. Certain types of styles are only applicable to certain types of layers, so it’s good to know what each one is.

### Layer data inspector

![Screenshot](manual/inspector.png)

If you click on the magnifying glass icon of any layer, a drawer will slide in from the left and a table of data will appear. (It may take a few seconds for the data to show up if you are inspecting a complex file.)

### Color palette

TileMill keeps track of all the colors you use in a project, and makes it easy to edit them and add new ones.

### Fonts list

Clicking on the ‘Fonts’ tab next to ‘Colors’ will switch the panel display to a list of all the system fonts Mapnik can find. You can filter the list by typing in the text box, or scroll through the list to find what you’re looking for. Clicking on a font will insert its name (in quotes) to the code where your cursor is.

Unlike what you may be used to from CSS or common word processor interfaces, there are no distinct properties for a font’s family (eg ‘Arial’), weight (eg bold), and style (eg italic). This is why, for example, “Arial Regular”, “Arial Bold”, and “Arial Italic” are listed individually.

### Code editor

![Screenshot](manual/editor.png)

1. Active stylesheet tab
2. Delete stylesheet
3. Inactive stylesheet tabs
4. New stylesheet button
5. MSS syntax reference
6. Line numbers
7. Text area

TileMill provides an integrated code editor for editing the map stylesheets. This editor will make sure you write valid code, coloring correctly formatted text as you write it (syntax highlighting) and highlighting any errors if you try to save an invalid file.

As your map style becomes more complex, you may wish to keep things organized by splitting the style across multiple files. New stylesheets can be added with the + button on the tab bar and entering a name for the file. Though not required, there is a convention of using the file extention `.mss` for ‘map stylesheet’.

Stylesheets can be re-ordered by clicking and dragging their tabs within the tab bar. Note that just like CSS, the order can have an effect on the way a map is rendered - if two styles conflict, the one that is defined last will be applied. Here, ‘last’ means closest to the bottom of the file in the tab furthest to the right.

# Adding layers

Layers are how sets of data are added to a map in TileMill. Each  layer references a single shapefile, geoJSON file, KML file, geoTIFF, or (soon) PostGIS database query. Multiple layers are combined over top of each other to create the final map - if you are familiar with layers in Photoshop or other graphics software the concept is very similar. TileMill currently supports creating maps with four data formats.

### ESRI Shapefile
Usually referred to simply as ‘shapefile’, this is de facto standard file format for portable GIS data storage and is supported by most GIS software applications. The tricky part is that a single 'shapefile' is actually a collection of at least three files (possibly more). The required components are:

1. `file.shp` contains the geographical point, line, or polygon information
2. `file.dbf` a database of information describing objects in the .shp file
3. `file.shx` an index file

Because TileMill is designed to handle files across the Internet and dealing with collections of files complicates that somewhat, shapefiles must be stored in a zip file before they can be added to a TileMill project.

### GeoJSON

GeoJSON is a specification for storing spatial data in [JavaScript Object Notation](http://en.wikipedia.org/wiki/JSON), a compact plain-text format. The format can store points, lines, and polygons.

### KML

Keyhole Markup Language, or KML, is a standard geospatial data format that was originally developed for and popularized by Google Earth *1*. TileMill has limited support of this format - point and polygon styles will be ignored, and other features such as images and 3D models are not supported. There is also no support for the compressed KMZ format at this time.

- *1: Google acquired this project in 2004 from Keyhole, Inc., hence the name*

### GeoTIFF

GeoTIFF is a popular format for storing geospatial raster imagery such as satellite photography, remote sensing imagery, and digital elevation models.

Since Mapnik is currently unable to reproject raster data sources, to load them in TileMill you must ensure they are in Web Mercator projection. This can be done using the `gdalwarp` tool. For example, to reproject a Natural Earth world geotiff from its native WGS84, you would use a command such as

    gdalwarp -s_srs EPSG:4326 -t_srs "+proj=merc +a=6378137 +b=6378137 \
      +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null \
      +wktext +no_defs" -r cubic \
      -te -20037508.34 -20037508.34 20037508.34 20037508.34 \
      input_file.tif output_file.tif


<!-- TODO: explain the options -->

# The styling language

If you are familiar with web design with Cascading Stylesheets (CSS) the format of TileMill’s styling language will look familiar, though the exact properties are quite different.

## Symbolizers

Mapnik, the rendering software TileMill is built upon, provides a number of fundamental style types out of which to build complex styles. Each type is called a symbolizer, and has its own set of configurable properties.

There are currently 10 different symbolizers available in Mapnik, each of which can be applied to a certain type or types of geometry:

1. Line (for lines & polygons)
2. Polygon (for polygons*)
3. Point[c] (for points)
4. Text (for points, lines, and polygons)
5. Shield (for points & lines)
6. Line Pattern (for lines & polygons)
7. Polygon Pattern (for polygons*)
8. Raster (for rasters)
9. Markers (for points, lines, & polygons)
10. Buildings

*Note that these polygon symbolizers can technically be assigned to line geometries, but usually with unexpected or unsatisfactory results and is not really recommended.*

Multiple symbolizers can be applied to the same layer - some common combinations are line & polygons, point & text, line & markers, and line & line pattern.

A symbolizer is not present on the map unless it has a style defined, but once one of its style properties is added to the stylesheet default values will apply to the other properties for that symbolizer unless overridden. For example, the default line symbolizer color is black, so if you assign a `line-width` to a layer that line will be black unless you also assign a different color.

### The line symbolizer

Line styles can be applied to line or polygon geometries.

## Multiple symbolizers

A single layer is not limited to one of each symbolizer type. For example, multiple semi-transparent line symbolizers can be assigned to a polygon to achieve a soft glow or shadow effect. Multiple text symbolizers can be assigned to the same point with different offsets to label it with more than one field.

Normally when you assign a style to a layer, the style applies to a default symbolizer that is created. In the following example, the second rule overrides the first one because they both apply to the default symbolizer.

    #layer {
       line-color: #C00;
       line-width: 1;
    }

    #layer {
       line-color: #0AF;
       line-opacity: 0.5;
       line-width: 2;
    }

You can explicitly declare any number of new symbolizers for a layer that will be rendered in addition to styles they would otherwise conflict with. New symbolizers are defined using a double colon syntax inspired by [pseudo-elements](http://www.w3.org/TR/css3-selectors/#pseudo-elements) in CSS3:

    #layer {
       /* styles for the default symbolizers */
    }
    #layer::newsymbol {
       /* styles for a new symbolizer named ‘newsymbol’ */
    }

Note that `newsymbol` is not a special keyword but an arbitrary name chosen by the user. To help keep track of different symbolizers you can name additional symbolizers whatever makes sense for the situation. Some examples: `#road::casing`, `#coastline::glow_inner`, `#building::shadow`.

Returning to our previous example, declaring the second rule will add a blue glow on top of the red line instead of replacing it:

    #layer {
       line-color: #C00;
       line-width: 1;
    }

    #layer::glow {
       line-color: #0AF;
       line-opacity: 0.5;
       line-width: 4;
    }

![Screenshot](manual/symbolizer-1.png)

Symbolizers are rendered in the order they are defined, so here the `::glow` (blue line) appears on top of the first style (red line).

Named symbolizer styles can still be overridden by further styles that reference the same symbolizer name. In this example, the line color will be green, not green-on-yellow.

    .border::highlight {
       line-color: #FF0;
       line-opacity: 0.5;
    }

    .border::highlight {
       line-color: #3F6;
    }

![Screenshot](manual/symbolizer-2.png)

### Complex line styles with multiple symbolizers

Using combinations of different dasharrays and/or pattern images, a wide variety of complex line styles can be achieved.

*TODO: Examples*

# Further resources

## Free sources of GIS data

### Global

1. [Cloudmade OpenStreetMap Downloads](http://downloads.cloudmade.com/)
2. [GADM Global Administrative Areas](http://gadm.org/)
3. [Natural Earth](http://www.naturalearthdata.com/) (much of this data is included in TileMill)
4. [SRTM Digital Elevation from CGIAR](http://srtm.csi.cgiar.org/)

### National
1. [US Census Bureau TIGER/Line Shapefiles](http://www.census.gov/geo/www/tiger/tgrshp2009/tgrshp2009.html)
2. [Natural Resources Canada GeoGratis](http://www.geogratis.cgdi.gc.ca/)

### Regional & Local

1. [District of Columbia GIS Catalog](http://dcatlas.dcgis.dc.gov/catalog/)
2. [OpenData Ottawa](http://www.ottawa.ca/online_services/opendata/index_en.html)
3. [OpenData Paris (français)](http://opendata.paris.fr/opendata/jsp/site/Portal.jsp)

- [Introduction](#introduction)
- [Basics](#basics)
  - [GIS](#gis)
  - [Map projections](#map-projections)
  - [Zoom levels](#zoom-levels)
- [Interface tour](#interface-tour)
  - [Main toolbar](#main-toolbar)
  - [Map preview](#map-preview)
  - [Layers list](#layers-list)
  - [Layer data inspector](#layer-data-inspector)
  - [Color palette](#color-palette)
  - [Fonts list](#fonts-list)
  - [Code editor](#code-editor)
- [Adding layers](#adding-layers)
  - [ESRI Shapefile](#esri-shapefile)
  - [GeoJSON](#geojson)
  - [KML](#kml)
  - [GeoTIFF](#geotiff)
- [The styling language](#the-styling-language)
  - [Symbolizers](#symbolizers)
  - [The line symbolizer](#the-line-symbolizers)
  - [Complex line styles with multiple symbolizers](#complex-line-styles-with-multiple-symbolizers)
- [Further resources](#further-resources)
  - [Free sources of GIS data](#free-sources-of-gis-data)
  - [Global](#global)
  - [National](#national)
  - [Regional & Local](#regional-local)

