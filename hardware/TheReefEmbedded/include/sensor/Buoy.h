#ifndef BUOY_H
#define BUOY_H

#include <Arduino.h>

class SensorBuoy {
public:
    SensorBuoy(int pin);
    void begin();
    bool isActive();

private:
    int _pin;
};

#endif
