#ifndef WATER_LEVEL_MANAGER_H
#define WATER_LEVEL_MANAGER_H

#include <sensor/Buoy.h>
#include <actuator/WaterPump.h>
#include <http_server/HttpServerBuoy.h>

class WaterLevelManager
{
private:
    SensorBuoy *_sensor;
    ActuatorWaterPump *_waterPump;
    HttpServerBuoy *_serverBuoy;

    static bool _previousBuoyActiveStatus;
    
    void setPreviousBuoyActiveStatus(bool status);
    void sendBuoyStatusToServer(bool status);

public:
    WaterLevelManager();
    void handlerWaterLevel();
    void setActuatorWaterPump(ActuatorWaterPump* actuatorWaterPump);
    void setSensorBuoy(SensorBuoy* sensorBuoy);
    void setHttpServerBuoy(HttpServerBuoy* httpServerBuoy);
};

#endif
