#ifndef WATER_PUMP_H
#define WATER_PUMP_H

#include <Arduino.h>

class ActuatorWaterPump {
private:
   int  _pin;
   bool _status;

   void setStatus(bool status);
public:
    ActuatorWaterPump(int pin);
    void begin();
    void turnOn();
    void turnOff();
    bool isWaterPumpOn();
};

#endif