#
# This is a Shiny web application. You can run the application by clicking
# the 'Run App' button above.
#
# Find out more about building applications with Shiny here:
#
#    http://shiny.rstudio.com/
#

library(shinydashboard)
library(shiny)
library(leaflet)
library(png)


dbHeader <- dashboardHeader()

dbHeader$children[[2]]$children <-  tags$a(href='#',
                                           tags$img(src='icon.png',height='60',width='200'))

showMap <- function(){
  leafletOutput("map")
}


# Define UI for application that draws a histogram
ui <- fluidPage(
  tags$head(
    tags$link(rel = "stylesheet", type = "text/css", href = "https://unpkg.com/leaflet@1.3.4/dist/leaflet.css", 
              integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA==",
   crossorigin=""),
   tags$script(src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js",
               integrity="sha512-nMMmRyTVoLYqjP9hrbed9S+FzjZHW5gY1TWCHA5ckwXZBadntCNs8kEqAWdrb9O7rxbCaA4lKTIWjDXZxflOcA==",
               crossorigin="")
  ),
  

  dashboardPage(

    dbHeader,
    dashboardSidebar(
      
      sidebarMenu(
        menuItem("Map", tabName = "map", icon = icon("map")),
        menuItem("Settings", tabName = "settings", icon = icon("gear"))
      )
    ),
    dashboardBody(
      tabItems(
        tabItem(tabName = "map",
                
                  tags$div(id="mapid",
                
                  tags$style(type = "text/css", "#mapid {height: 910px !important;}")),
                 # showMap(),
                tags$script(src="map.js")
                
              ),
        tabItem(tabName = "settings",
                h2("Widgets tab content")
        )
      )
    )
  
  )
  
  
  

)






server <- function(input, output) {
  

  output$map <- renderLeaflet({
    leaflet() %>% addTiles() %>%  
      addMarkers(lng= -0.80027778, lat=51.118621111, popup="Acton Main Line Station") %>%
      addMarkers(lng= -0.80027778, lat=51.118621111, popup="Acton Main Line Station") %>%
      addMarkers(lng= -0.80027778, lat=51.118621111, popup="Acton Main Line Station") %>%
      addMarkers(lng= -0.80027778, lat=51.118621111, popup="Acton Main Line Station") %>%
      addMarkers(lng= -0.80027778, lat=51.118621111, popup="Acton Main Line Station") %>%
      addMarkers(lng= -0.80027778, lat=51.118621111, popup="Acton Main Line Station") %>%
      addMarkers(lng= -0.80027778, lat=51.118621111, popup="Acton Main Line Station") %>%
      addMarkers(lng= -0.80027778, lat=51.118621111, popup="Acton Main Line Station") %>%
      addMarkers(lng= -0.80027778, lat=51.118621111, popup="Acton Main Line Station") %>%
      setView( -0.80027778,51.118621111, 10.5)
  })
  
  
  observe({
    click<-input$map_marker_click
    if(is.null(click))
      return()
    #add action on marker click
    })
  
  

  
}

shinyApp(ui, server)