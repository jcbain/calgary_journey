import gmaps2geojson
# import os
# import googlemaps

# apikey = os.environ['GMAPS_KEY']

# gmaps = googlemaps.Client(key=apikey)
writer = gmaps2geojson.Writer()

path1 = writer.query("1411 NE 79th St, Kansas City, MO 64118, USA", "Paducah, KY 42003, USA")
path2 = writer.query("Paducah, KY 42003, USA", "Ferguson, North Carolina 28624, USA")
path3 = writer.query("Ferguson, North Carolina 28624, USA", "Pittsburgh, PA 15219, USA")
path4 = writer.query("Pittsburgh, PA 15219, USA", "1411 NE 79th St, Kansas City, MO 64118, USA")

writer.save("kc_to_kc.geojson")