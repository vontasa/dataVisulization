#read in the file
data <- read.csv("A:\\PODS\\SalesRepDeployment\\Analytics Day\\RandomOutput.csv", header=TRUE)

str(data)
#create a data frame for all variables needed in JSON
df <- data
colnames(df)<-c("id","name","long","lat", "RD", "TerritoryScore", "newRD")

#create a function to make into JSON format
createJSON <- function(name, RD, terrscore, lat, long) {
  json_list = sprintf('
                          {
                            "type": "Feature",  
                            "properties": { 
                              "name": "%s",
                              "group": "%s",
                              "territoryscore": %s
                            },
                            "geometry": {
                              "type": "Point",
                              "coordinates": [%s, %s]
                            }
                        },', name, RD, terrscore, lat, long)
  return(json_list)
}

#create the header of the file
header = sprintf('var reps = {
                  "type": "FeatureCollection",
                  "features": [')
#print the header into the file
cat(header, file = "output.txt", append = TRUE)

#for all of the rows in the data frame, transform into JSON format
#and print onto the file
for (i in 1:nrow(df)){
  json.list <- createJSON(df$name[i], df$RD[i], 
                          df$TerritoryScore[i], df$lat[i], 
                          df$long[i])
  cat(json.list, file = "output.txt", append = TRUE)
}

#create and print the JSON footer onto the file
footer = sprintf('
                  ]
                 };')
cat(footer,file = "output.txt", append = TRUE)

