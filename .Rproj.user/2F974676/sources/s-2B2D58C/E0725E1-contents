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


map <- function(){
  leafletOutput("map")
}
# Define UI for application that draws a histogram
ui <- fluidPage(

  

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
                  tags$style(type = "text/css", "#map {height: 910px !important;}"),
                  map()
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
    leaflet() %>% addTiles() %>% setView( -0.80027778,51.118621111, 10.5)
  })
  
  

  
}

shinyApp(ui, server)