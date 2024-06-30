#ifndef WATER_LEVEL_MANAGER_H
#define WATER_LEVEL_MANAGER_H

#include <sensor/Buoy.h>
#include <actuator/WaterPump.h>
#include <http_server/HttpServerBuoy.h>
#include <http_server/HttpServerWaterPump.h>

class WaterLevelManager
{
private:
    SensorBuoy *_sensor;
    ActuatorWaterPump *_waterPump;
    HttpServerBuoy *_serverBuoy;
    HttpServerWaterPump *_serverWaterPump;

    static bool _previousBuoyActiveStatus;
    
    void setPreviousBuoyActiveStatus(bool status);
    void sendBuoyStatusToServer(bool status);

public:
    WaterLevelManager();
    void handlerWaterLevel();
    void begin();
    void setActuatorWaterPump(ActuatorWaterPump* actuatorWaterPump);
    void setSensorBuoy(SensorBuoy* sensorBuoy);
    void setHttpServerBuoy(HttpServerBuoy* httpServerBuoy);
    void setHttpServerWaterPump(HttpServerWaterPump* httpServerWaterPump);
};

#endif
