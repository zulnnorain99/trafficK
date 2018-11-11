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
library(shinyjs)
library(devtools)
install_github("nik01010/dashboardthemes")
library(dashboardthemes)

traff=read.csv("traffik.csv", header=T)
#traff=na.omit(traff)

library(timeDate)
library(lubridate)
library(dplyr)
library(ggplot2)

traff$timestamp_in <- ymd_hms((traff$timestamp_in))
traff$timestamp_out<-ymd_hms(traff$timestamp_out)
traff$timestamp_wtt_in <-ymd_hms(traff$timestamp_wtt_in)
traff$timestamp_wtt_out<-ymd_hms (traff$timestamp_wtt_out)

traff$Station=sort(traff$Station)
levels(traff$Station)
traff$day_of_week=factor(traff$day_of_week,levels(traff$day_of_week)[c(4,2,6,7,5,1,3)])
levels(traff$day_of_week)
Station=(traff$Station)[1]
###subsetting all of the data into station####
#1
BEDHAMPTON_station_av=traff%>%
  group_by(Origin, Destination,Station,day_of_week)%>%
  filter(Station=="BEDHAMPTON")%>%
  summarise(mean=mean(delay_secs))

#2
BYFLEET_NEW_HAW_station_av=traff%>%
  group_by(Origin, Destination,Station,day_of_week)%>%
  filter(Station=="BYFLEET & NEW HAW")%>%
  summarise(mean=mean(delay_secs))
#3
CLAP_station_av=traff%>%
  group_by(Origin, Destination,Station,day_of_week)%>%
  filter(Station=="CLAPHAM JUNCTION MAIN (9-11)")%>%
  summarise(mean=mean(delay_secs))


#4
EARLSFIELD_station_av=traff%>%
  group_by(Origin, Destination,Station,day_of_week)%>%
  filter(Station=="EARLSFIELD")%>%
  summarise(mean=mean(delay_secs))

#5
ESHER_station_av=traff%>%
  group_by(Origin, Destination,Station,day_of_week)%>%
  filter(Station=="ESHER")%>%
  summarise(mean=mean(delay_secs))

#6
FARNCOMBE_station_av=traff%>%
  group_by(Origin, Destination,Station,day_of_week)%>%
  filter(Station=="FARNCOMBE")%>%
  summarise(mean=mean(delay_secs))

#7
FRATTON_station_av=traff%>%
  group_by(Origin, Destination,Station,day_of_week)%>%
  filter(Station=="FRATTON")%>%
  summarise(mean=mean(delay_secs))

#8
GODALMING_station_av=traff%>%
  group_by(Origin, Destination,Station,day_of_week)%>%
  filter(Station=="GODALMING")%>%
  summarise(mean=mean(delay_secs))
#9
GUILDFORD_station_av=traff%>%
  group_by(Origin, Destination,Station,day_of_week)%>%
  filter(Station=="GUILDFORD")%>%
  summarise(mean=mean(delay_secs))

#10
HASLEMERE=traff%>%
  group_by(Origin, Destination,Station,day_of_week)%>%
  filter(Station=="HASLEMERE")%>%
  summarise(mean=mean(delay_secs))

#11
HAVANT=traff%>%
  group_by(Origin, Destination,Station,day_of_week)%>%
  filter(Station=="HAVANT")%>%
  summarise(mean=mean(delay_secs))

#12
HERSHAM_station_av=traff%>%
  group_by(Origin, Destination,Station,day_of_week)%>%
  filter(Station=="HERSHAM")%>%
  summarise(mean=mean(delay_secs))

#13
HILSEA_station_av=traff%>%
  group_by(Origin, Destination,Station,day_of_week)%>%
  filter(Station=="HILSEA")%>%
  summarise(mean=mean(delay_secs))

#14
LIPHOOK_station_av=traff%>%
  group_by(Origin, Destination,Station,day_of_week)%>%
  filter(Station=="LIPHOOK")%>%
  summarise(mean=mean(delay_secs))

#15
BYFLEET_NEW_HAW_station_av=traff%>%
  group_by(Origin, Destination,Station,day_of_week)%>%
  filter(Station=="BYFLEET & NEW HAW")%>%
  summarise(mean=mean(delay_secs))

#16
LISS_station_av=traff%>%
  group_by(Origin, Destination,Station,day_of_week)%>%
  filter(Station=="LISS")%>%
  summarise(mean=mean(delay_secs))

#17
LONDON_WATERLOO_station_av=traff%>%
  group_by(Origin, Destination,Station,day_of_week)%>%
  filter(Station=="LONDON WATERLOO")%>%
  summarise(mean=mean(delay_secs))

#18
MILFORD_station_av=traff%>%
  group_by(Origin, Destination,Station,day_of_week)%>%
  filter(Station=="MILFORD")%>%
  summarise(mean=mean(delay_secs))

#19
PORTSMOUTH_SOUTHSEA_station_av=traff%>%
  group_by(Origin, Destination,Station,day_of_week)%>%
  filter(Station=="PORTSMOUTH & SOUTHSEA")%>%
  summarise(mean=mean(delay_secs))

#20
PORTSMOUTH_HARBOUR_station_av=traff%>%
  group_by(Origin, Destination,Station,day_of_week)%>%
  filter(Station=="PORTSMOUTH HARBOUR")%>%
  summarise(mean=mean(delay_secs))

#21
ROWLANDS_CASTLE_station_av=traff%>%
  group_by(Origin, Destination,Station,day_of_week)%>%
  filter(Station=="ROWLANDS CASTLE")%>%
  summarise(mean=mean(delay_secs))

#22
BYFLEET_NEW_HAW_station_av=traff%>%
  group_by(Origin, Destination,Station,day_of_week)%>%
  filter(Station=="BYFLEET & NEW HAW")%>%
  summarise(mean=mean(delay_secs))

#23
VAUXHALL_station_av=traff%>%
  group_by(Origin, Destination,Station,day_of_week)%>%
  filter(Station=="VAUXHALL (MAIN)")%>%
  summarise(mean=mean(delay_secs))

#24
WALTON_ON_THAMES_station_av=traff%>%
  group_by(Origin, Destination,Station,day_of_week)%>%
  filter(Station=="WALTON ON THAMES")%>%
  summarise(mean=mean(delay_secs))

#25
WEST_BYFLEET_station_av=traff%>%
  group_by(Origin, Destination,Station,day_of_week)%>%
  filter(Station=="WEST BYFLEET")%>%
  summarise(mean=mean(delay_secs))

#26
WEYBRIDGE_station_av=traff%>%
  group_by(Origin, Destination,Station,day_of_week)%>%
  filter(Station=="BYFLEET & NEW HAW")%>%
  summarise(mean=mean(delay_secs))
#27
WIMBLEDON_WESSEX_SIDE_station_av=traff%>%
  group_by(Origin, Destination,Station,day_of_week)%>%
  filter(Station=="WIMBLEDON (WESSEX SIDE)")%>%
  summarise(mean=mean(delay_secs))

#28
WITLEY_station_av=traff%>%
  group_by(Origin, Destination,Station,day_of_week)%>%
  filter(Station=="WITLEY")%>%
  summarise(mean=mean(delay_secs))

#29
WOKING_station_av=traff%>%
  group_by(Origin, Destination,Station,day_of_week)%>%
  filter(Station=="WOKING")%>%
  summarise(mean=mean(delay_secs))

#30
WORPLESDON_station_av=traff%>%
  group_by(Origin, Destination,Station,day_of_week)%>%
  filter(Station=="WORPLESDON")%>%
  summarise(mean=mean(delay_secs))

###headcode
headcode=traff%>%
  group_by(Headcode,day_of_week)%>%
  summarise(mean=mean(delay_secs))
levels(traff$Headcode)



dbHeader <- dashboardHeader()

dbHeader$children[[2]]$children <-  tags$a(href='#',
                                           tags$img(src='icon.png',height='60',width='200'))

showMap <- function(){
  leafletOutput("map")
}


# Define UI for application that draws a histogram
ui <- fluidPage(
  tags$script(src="math.js"),
  tags$script(src="data.js"),
  #tags$script(src="searchbar.js"),
  
  
  
  tags$iframe( id="frmFile", src="traffik.txt", onload="LoadFile();", style="display: none;"),
  tags$script(src="searchbarhtml.js"),
  tags$head(
    tags$link(rel = "stylesheet", type = "text/css", href = "https://unpkg.com/leaflet@1.3.4/dist/leaflet.css",
              integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA==",
              crossorigin=""),
    tags$link(rel = "stylesheet", href = "https://www.w3schools.com/w3css/4/w3.css"),
    tags$script(src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js",
                integrity="sha512-nMMmRyTVoLYqjP9hrbed9S+FzjZHW5gY1TWCHA5ckwXZBadntCNs8kEqAWdrb9O7rxbCaA4lKTIWjDXZxflOcA==",
                crossorigin="")
  ),
  
  
  dashboardPage(
    
    dbHeader,
    dashboardSidebar(
      
      sidebarMenu(
        id="sidebar",
        box(id="search_bar_box",width=200, height = 60),
        menuItem("Map", tabName = "map", icon = icon("map")),
        menuItem("Station Delays", tabName = "station_delays", icon = icon("train"))
        
      )
    ),
    dashboardBody(
      
      ### changing theme
      shinyDashboardThemes(
        theme = "poor_mans_flatly"
      )
      
      ### ui tabs
      ,
      tabItems(
        tabItem(tabName = "map",
                fluidRow(
                  box( height="1000px",
                       tags$div(id="mapid",
                                
                                tags$style(type = "text/css", "#mapid {height: 1000px !important;}")),
                       # showMap()
                       
                       
                       tags$script(src="events.js"),
                       tags$script(src="map.js")
                  ),
                  
                  box(height="1000px",
                      
                      tags$div(id="detailsId"),
                      tags$script(src="sdetailshtml.js"),
                      tags$script(src="stationsDetails.js")
                      
                      
                      
                  )
                  
                )
                
        ),
        tabItem("station_delays",
                
                fluidRow(box(width =12, 
                             title = "Average delays (in seconds) per station",selectInput("Station", "Station",
                                                                                           c(levels(Station)))),
                         mainPanel(
                           plotOutput("delayPlot")  
                         ))
        )
      )
    )
    
  ),
  
  
  
  tags$script(src="events.js")
  
  
)






server <- function(input, output) {
  # Fill in the spot we created for a plot
  output$delayPlot <- renderPlot({
    
    if (input$Station=="BEDHAMPTON"){
      gg=ggplot(BEDHAMPTON_station_av)+
        geom_bar(aes(day_of_week, mean, fill=day_of_week), colour="black",
                 position = "dodge", stat = "summary", fun.y = "mean")+
        theme_bw()+
        labs(x = "", y= "Average delay at station (secs)",title="BEDHAMPTON")
      gg+theme(legend.position="none",plot.title=element_text(size=15, 
                                                              face="bold", 
                                                              #family="Arial",
                                                              color="black",
                                                              hjust=0.5,
                                                              lineheight=1.2))
    }
    
    else if (input$Station=="BYFLEET & NEW HAW"){
      gg=ggplot(BYFLEET_NEW_HAW_station_av)+
        geom_bar(aes(day_of_week, mean, fill=day_of_week), colour="black",
                 position = "dodge", stat = "summary", fun.y = "mean")+
        theme_bw()+
        labs(x = "", y= "Average delay at station (secs)",title="BYFLEET & NEW HAW")
      gg+theme(legend.position="none",plot.title=element_text(size=15, 
                                                              face="bold", 
                                                              #family="Arial",
                                                              color="black",
                                                              hjust=0.5,
                                                              lineheight=1.2))
    }
    else if (input$Station=="CLAPHAM JUNCTION MAIN (9-11)"){
      gg=ggplot(CLAP_station_av)+
        geom_bar(aes(day_of_week, mean, fill=day_of_week), colour="black",
                 position = "dodge", stat = "summary", fun.y = "mean")+
        theme_bw()+
        labs(x = "", y= "Average delay at station (secs)",title="CLAPHAM JUNCTION MAIN")
      gg+theme(legend.position="none",plot.title=element_text(size=15, 
                                                              face="bold", 
                                                              #family="Arial",
                                                              color="black",
                                                              hjust=0.5,
                                                              lineheight=1.2))
    }
    else if (input$Station=="EARLSFIELD"){
      gg=ggplot(EARLSFIELD_station_av)+
        geom_bar(aes(day_of_week, mean, fill=day_of_week), colour="black",
                 position = "dodge", stat = "summary", fun.y = "mean")+
        theme_bw()+
        labs(x = "", y= "Average delay at station (secs)",title="EARLSFIELD")
      gg+theme(legend.position="none",plot.title=element_text(size=15, 
                                                              face="bold", 
                                                              #family="Arial",
                                                              color="black",
                                                              hjust=0.5,
                                                              lineheight=1.2))
    }
    else if (input$Station=="ESHER"){
      gg=ggplot(ESHER_station_av)+
        geom_bar(aes(day_of_week, mean, fill=day_of_week), colour="black",
                 position = "dodge", stat = "summary", fun.y = "mean")+
        theme_bw()+
        labs(x = "", y= "Average delay at station (secs)",title="ESHER")
      gg+theme(legend.position="none",plot.title=element_text(size=15, 
                                                              face="bold", 
                                                              #family="Arial",
                                                              color="black",
                                                              hjust=0.5,
                                                              lineheight=1.2))
    }
    else if (input$Station=="FARNCOMBE"){
      gg=ggplot(FARNCOMBE_station_av)+
        geom_bar(aes(day_of_week, mean, fill=day_of_week), colour="black",
                 position = "dodge", stat = "summary", fun.y = "mean")+
        theme_bw()+
        labs(x = "", y= "Average delay at station (secs)",title="FARNCOMBE")
      gg+theme(legend.position="none",plot.title=element_text(size=15, 
                                                              face="bold", 
                                                              #family="Arial",
                                                              color="black",
                                                              hjust=0.5,
                                                              lineheight=1.2))
    }
    else if (input$Station=="FRATTON"){
      gg=ggplot(FRATTON_station_av)+
        geom_bar(aes(day_of_week, mean, fill=day_of_week), colour="black",
                 position = "dodge", stat = "summary", fun.y = "mean")+
        theme_bw()+
        labs(x = "", y= "Average delay at station (secs)",title="FRATTON")
      gg+theme(legend.position="none",plot.title=element_text(size=15, 
                                                              face="bold", 
                                                              #family="Arial",
                                                              color="black",
                                                              hjust=0.5,
                                                              lineheight=1.2))
    }
    else if (input$Station=="GODALMING"){
      gg=ggplot(GODALMING_station_av)+
        geom_bar(aes(day_of_week, mean, fill=day_of_week), colour="black",
                 position = "dodge", stat = "summary", fun.y = "mean")+
        theme_bw()+
        labs(x = "", y= "Average delay at station (secs)",title="GODALMING")
      gg+theme(legend.position="none",plot.title=element_text(size=15, 
                                                              face="bold", 
                                                              #family="Arial",
                                                              color="black",
                                                              hjust=0.5,
                                                              lineheight=1.2))
    }
    else if (input$Station=="GUILDFORD"){
      gg=ggplot(GUILDFORD_station_av)+
        geom_bar(aes(day_of_week, mean, fill=day_of_week), colour="black",
                 position = "dodge", stat = "summary", fun.y = "mean")+
        theme_bw()+
        
        labs(x = "", y= "Average delay at station (secs)",title="GUILDFORD")
      gg+theme(legend.position="none",plot.title=element_text(size=15, 
                                                              face="bold", 
                                                              #family="Arial",
                                                              color="black",
                                                              hjust=0.5,
                                                              lineheight=1.2))
    }
    else if (input$Station=="HASLEMERE"){
      gg=ggplot(HASLEMERE_station_av)+
        geom_bar(aes(day_of_week, mean, fill=day_of_week), colour="black",
                 position = "dodge", stat = "summary", fun.y = "mean")+
        theme_bw()+
        labs(x = "", y= "Average delay at station (secs)",title="HASLEMERE")
      gg+theme(legend.position="none",plot.title=element_text(size=15, 
                                                              face="bold", 
                                                              #family="Arial",
                                                              color="black",
                                                              hjust=0.5,
                                                              lineheight=1.2))
    }
    else if (input$Station=="HAVANT"){
      gg=ggplot(HAVANT_station_av)+
        geom_bar(aes(day_of_week, mean, fill=day_of_week), colour="black",
                 position = "dodge", stat = "summary", fun.y = "mean")+
        theme_bw()+
        labs(x = "", y= "Average delay at station (secs)",title="HAVANT")
      gg+theme(legend.position="none",plot.title=element_text(size=15, 
                                                              face="bold", 
                                                              #family="Arial",
                                                              color="black",
                                                              hjust=0.5,
                                                              lineheight=1.2))
    }
    else if (input$Station=="HERSHAM"){
      gg=ggplot(HERSHAM_station_av)+
        geom_bar(aes(day_of_week, mean, fill=day_of_week), colour="black",
                 position = "dodge", stat = "summary", fun.y = "mean")+
        theme_bw()+
        labs(x = "", y= "Average delay at station (secs)",title="HERSHAM")
      gg+theme(legend.position="none",plot.title=element_text(size=15, 
                                                              face="bold", 
                                                              #family="Arial",
                                                              color="black",
                                                              hjust=0.5,
                                                              lineheight=1.2))
    }
    else if (input$Station=="HILSEA"){
      gg=ggplot(HILSEA_station_av)+
        geom_bar(aes(day_of_week, mean, fill=day_of_week), colour="black",
                 position = "dodge", stat = "summary", fun.y = "mean")+
        theme_bw()+
        labs(x = "", y= "Average delay at station (secs)",title="HILSEA")
      gg+theme(legend.position="none",plot.title=element_text(size=15, 
                                                              face="bold", 
                                                              #family="Arial",
                                                              color="black",
                                                              hjust=0.5,
                                                              lineheight=1.2))
    }
    else if (input$Station=="LIPHOOK"){
      gg=ggplot(LIPHOOK_station_av)+
        geom_bar(aes(day_of_week, mean, fill=day_of_week), colour="black",
                 position = "dodge", stat = "summary", fun.y = "mean")+
        theme_bw()+
        labs(x = "", y= "Average delay at station (secs)",title="LIPHOOK")
      gg+theme(legend.position="none",plot.title=element_text(size=15, 
                                                              face="bold", 
                                                              #family="Arial",
                                                              color="black",
                                                              hjust=0.5,
                                                              lineheight=1.2))
    }
    else if (input$Station=="LISS"){
      gg=ggplot(LISS_station_av)+
        geom_bar(aes(day_of_week, mean, fill=day_of_week), colour="black",
                 position = "dodge", stat = "summary", fun.y = "mean")+
        theme_bw()+
        labs(x = "", y= "Average delay at station (secs)",title="LISS")
      gg+theme(legend.position="none",plot.title=element_text(size=15, 
                                                              face="bold", 
                                                              #family="Arial",
                                                              color="black",
                                                              hjust=0.5,
                                                              lineheight=1.2))
    }
    else if (input$Station=="MILFORD"){
      gg=ggplot(MILFORD_station_av)+
        geom_bar(aes(day_of_week, mean, fill=day_of_week), colour="black",
                 position = "dodge", stat = "summary", fun.y = "mean")+
        theme_bw()+
        labs(x = "", y= "Average delay at station (secs)",title="MILFORD")
      gg+theme(legend.position="none",plot.title=element_text(size=15, 
                                                              face="bold", 
                                                              #family="Arial",
                                                              color="black",
                                                              hjust=0.5,
                                                              lineheight=1.2))
    }
    else if (input$Station=="PETERSFIELD"){
      gg=ggplot(PETERSFIELD_station_av)+
        geom_bar(aes(day_of_week, mean, fill=day_of_week), colour="black",
                 position = "dodge", stat = "summary", fun.y = "mean")+
        theme_bw()+
        labs(x = "", y= "Average delay at station (secs)",title="PETERSFIELD")
      gg+theme(legend.position="none",plot.title=element_text(size=15, 
                                                              face="bold", 
                                                              #family="Arial",
                                                              color="black",
                                                              hjust=0.5,
                                                              lineheight=1.2))
    }
    else if (input$Station=="PORTSMOUTH & SOUTHSEA"){
      gg=ggplot(PORTSMOUTH_SOUTHSEA_station_av)+
        geom_bar(aes(day_of_week, mean, fill=day_of_week), colour="black",
                 position = "dodge", stat = "summary", fun.y = "mean")+
        theme_bw()+
        labs(x = "", y= "Average delay at station (secs)",title="PORTSMOUTH & SOUTHSEA")
      gg+theme(legend.position="none",plot.title=element_text(size=15, 
                                                              face="bold", 
                                                              #family="Arial",
                                                              color="black",
                                                              hjust=0.5,
                                                              lineheight=1.2))
    }
    else if (input$Station=="ROWLANDS CASTLE"){
      gg=ggplot(ROWLANDS_CASTLE_station_av)+
        geom_bar(aes(day_of_week, mean, fill=day_of_week), colour="black",
                 position = "dodge", stat = "summary", fun.y = "mean")+
        theme_bw()+
        labs(x = "", y= "Average delay at station (secs)",title="ROWLANDS CASTLE")
      gg+theme(legend.position="none",plot.title=element_text(size=15, 
                                                              face="bold", 
                                                              #family="Arial",
                                                              color="black",
                                                              hjust=0.5,
                                                              lineheight=1.2))
    }
    else if (input$Station=="SURBITON"){
      gg=ggplot(SURBITON_station_av)+
        geom_bar(aes(day_of_week, mean, fill=day_of_week), colour="black",
                 position = "dodge", stat = "summary", fun.y = "mean")+
        theme_bw()+
        labs(x = "", y= "Average delay at station (secs)",title="SURBITON")
      gg+theme(legend.position="none",plot.title=element_text(size=15, 
                                                              face="bold", 
                                                              # family="Arial",
                                                              color="black",
                                                              hjust=0.5,
                                                              lineheight=1.2))
    }
    else if(input$Station=="VAUXHALL (MAIN)"){
      gg=ggplot(VAUXHALL_station_av)+
        geom_bar(aes(day_of_week, mean, fill=day_of_week), colour="black",
                 position = "dodge", stat = "summary", fun.y = "mean")+
        theme_bw()+
        labs(x = "", y= "Average delay at station (secs)",title="VAUXHALL (MAIN)")
      gg+theme(legend.position="none",plot.title=element_text(size=15, 
                                                              face="bold", 
                                                              #family="Arial",
                                                              color="black",
                                                              hjust=0.5,
                                                              lineheight=1.2))
    }
    else if (Station=="WALTON ON THAMES"){
      gg=ggplot(WALTON_ON_THAMES_station_av)+
        geom_bar(aes(day_of_week, mean, fill=day_of_week), colour="black",
                 position = "dodge", stat = "summary", fun.y = "mean")+
        theme_bw()+
        labs(x = "", y= "Average delay at station (secs)",title="WALTON ON THAMES")
      gg+theme(legend.position="none",plot.title=element_text(size=15, 
                                                              face="bold", 
                                                              #family="Arial",
                                                              color="black",
                                                              hjust=0.5,
                                                              lineheight=1.2))
    }
    else if (input$Station=="WEST BYFLEET"){
      gg=ggplot(WEST_BYFLEET_station_av)+
        geom_bar(aes(day_of_week, mean, fill=day_of_week), colour="black",
                 position = "dodge", stat = "summary", fun.y = "mean")+
        theme_bw()+
        labs(x = "", y= "Average delay at station (secs)",title="WEST BYFLEET")
      gg+theme(legend.position="none",plot.title=element_text(size=15, 
                                                              face="bold", 
                                                              #family="Arial",
                                                              color="black",
                                                              hjust=0.5,
                                                              lineheight=1.2))
    }
    else if (input$Station=="WEYBRIDGE"){
      gg=ggplot(WEYBRIDGE_station_av)+
        geom_bar(aes(day_of_week, mean, fill=day_of_week), colour="black",
                 position = "dodge", stat = "summary", fun.y = "mean")+
        theme_bw()+
        labs(x = "", y= "Average delay at station (secs)",title="WEYBRIDGE")
      gg+theme(legend.position="none",plot.title=element_text(size=15, 
                                                              face="bold", 
                                                              # family="Arial",
                                                              color="black",
                                                              hjust=0.5,
                                                              lineheight=1.2))
    }
    else if (input$Station=="WIMBLEDON (WESSEX SIDE)"){
      gg=ggplot(WIMBLEDON_WESSEX_SIDE_station_av)+
        geom_bar(aes(day_of_week, mean, fill=day_of_week), colour="black",
                 position = "dodge", stat = "summary", fun.y = "mean")+
        theme_bw()+
        labs(x = "", y= "Average delay at station (secs)",title="WIMBLEDON (WESSEX SIDE)")
      gg+theme(legend.position="none",plot.title=element_text(size=15, 
                                                              face="bold", 
                                                              #family="Arial",
                                                              color="black",
                                                              hjust=0.5,
                                                              lineheight=1.2))
    }
    else if (input$Station=="WITLEY"){
      gg=ggplot(WITLEY_station_av)+
        geom_bar(aes(day_of_week, mean, fill=day_of_week), colour="black",
                 position = "dodge", stat = "summary", fun.y = "mean")+
        theme_bw()+
        labs(x = "", y= "Average delay at station (secs)",title="WITLEY")
      gg+theme(legend.position="none",plot.title=element_text(size=15, 
                                                              face="bold", 
                                                              #family="Arial",
                                                              color="black",
                                                              hjust=0.5,
                                                              lineheight=1.2))
    }
    else if (input$Station=="WOKING"){
      gg=ggplot(WOKING_station_av)+
        geom_bar(aes(day_of_week, mean, fill=day_of_week), colour="black",
                 position = "dodge", stat = "summary", fun.y = "mean")+
        theme_bw()+
        labs(x = "", y= "Average delay at station (secs)",title="WOKING")
      gg+theme(legend.position="none",plot.title=element_text(size=15, 
                                                              face="bold", 
                                                              #family="Arial",
                                                              color="black",
                                                              hjust=0.5,
                                                              lineheight=1.2))
    }
    else if (input$Station=="WORPLESDON"){
      gg=ggplot(WORPLESDON_station_av)+
        geom_bar(aes(day_of_week, mean, fill=day_of_week), colour="black",
                 position = "dodge", stat = "summary", fun.y = "mean")+
        theme_bw()+
        labs(x = "", y= "Average delay at station (secs)",title="WORPLESDON")
      gg+theme(legend.position="none",plot.title=element_text(size=15, 
                                                              face="bold", 
                                                              #family="Arial",
                                                              color="black",
                                                              hjust=0.5,
                                                              lineheight=1.2))
    }
    
  })
  
}

shinyApp(ui, server)
