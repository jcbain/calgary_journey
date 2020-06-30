import gmaps2geojson
# import os
# import googlemaps

# apikey = os.environ['GMAPS_KEY']

# gmaps = googlemaps.Client(key=apikey)
writer = gmaps2geojson.Writer()

path1 = writer.query("1411 NE 79th St, Kansas City, MO 64118, USA", "Sioux City, Iowa 51101, USA")
path2 = writer.query("Sioux City, Iowa 51101, USA", "West Fargo, ND 58078, USA")
path3 = writer.query("West Fargo, ND 58078, USA", "Portal, North Dakota 58772, USA")
path4 = writer.query("Portal, North Dakota 58772", "Moose Jaw, SK, Canada")
path5 = writer.query("Moose Jaw, SK, Canada", "Swift Current, SK, Canada")
path6 = writer.query("Swift Current, SK, Canada", "804 18 Avenue Southwest, Calgary, AB")


writer.save("kc_back_calgary.geojson")