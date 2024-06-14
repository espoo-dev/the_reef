#ifndef BUOY_H
#define BUOY_H

#include <Arduino.h>

class SensorBuoy {
public:
    SensorBuoy(int pin);
    void begin();
    bool isWaterLevelAbove();

private:
    int _pin;
};

#endif
