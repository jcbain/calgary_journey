import gmaps2geojson

writer = gmaps2geojson.Writer()

path01 = writer.query("1007 Sunset Ln, Columbia, MO 65203, USA", "1411 NE 79th St, Kansas City, MO 64118, USA")
path02 = writer.query("1411 NE 79th St, Kansas City, MO 64118, USA", "Dearborn Rest Area Northbound, I-29, Dearborn, MO 64439, United States")
path03 = writer.query("Dearborn Rest Area Northbound, I-29, Dearborn, MO 64439, United States", "Dignity Statue, Chamberlain, SD 57325, United States")
path04 = writer.query("Dignity Statue, Chamberlain, SD 57325, United States", "I-90, Philip, SD 57567, USA")
path05 = writer.query("I-90, Philip, SD 57567, USA", "Wall, South Dakota 57790, USA")
path06 = writer.query("Wall, South Dakota 57790, USA", "Pinnacles Entrance Station, 24240 SD-240, Wall, SD 57790, United States")
path07 = writer.query("Pinnacles Entrance Station, 24240 SD-240, Wall, SD 57790, United States", "Rim Rd, Wall, SD 57790, USA")
path08 = writer.query("Rim Rd, Wall, SD 57790, USA", "Sage Creek Rd, Scenic, SD 57780, USA")
path09 = writer.query("Sage Creek Rd, Scenic, SD 57780, USA", "Mount Rushmore National Memorial, 13000 SD-244, Keystone, SD 57751, United States")
path10 = writer.query("Mount Rushmore National Memorial, 13000 SD-244, Keystone, SD 57751, United States", "Devils Tower, Wyoming 82714, USA")
path11 = writer.query("Devils Tower, Wyoming 82714, USA", "Billings, Montana, USA")
path12 = writer.query("Billings, Montana, USA", "Hobson, Montana 59452, USA")
path13 = writer.query("Hobson, Montana 59452, USA", "Sweet Grass, Montana 59484, USA")
path14 = writer.query("Sweet Grass, Montana 59484, USA", "804 18 Avenue Southwest, Calgary, AB")

writer.save("to_calgary.geojson")