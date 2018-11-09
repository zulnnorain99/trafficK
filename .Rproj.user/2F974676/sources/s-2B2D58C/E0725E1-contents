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

m <- leaflet()
m <- addTiles(m)
m <- addMarkers(m, lng=174.768, lat=-36.852, popup="The birthplace of R")





# Define UI for application that draws a histogram
ui <- fluidPage(
  

  dashboardPage(

    dashboardHeader(
      
    ),
    dashboardSidebar(
      
      sidebarMenu(
        menuItem("Map", tabName = "map", icon = icon("map")),
        menuItem("Settings", tabName = "settings", icon = icon("gear"))
      )
      
    ),
    dashboardBody(
      tags$style(type = "text/css", "#map {height: 910px !important;}"),
      leafletOutput("map")
  ))
)

server <- function(input, output) {
  
  output$map <- renderLeaflet({
    leaflet() %>% addTiles() %>% setView( -0.80027778,51.118621111, 10)
  })
  

  
}

shinyApp(ui, server)