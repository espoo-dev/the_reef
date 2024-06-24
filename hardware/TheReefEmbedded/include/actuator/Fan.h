#ifndef ACTUATOR_FAN_H
#define ACTUATOR_FAN_H

#include <Arduino.h>

class ActuatorFan {
private:
   int  _pin;
   bool _status;

   void setStatus(bool status);
public:
    ActuatorFan(int pin);
    void begin();
    void turnOn();
    void turnOff();
    bool getStatusFan();
};

#endif