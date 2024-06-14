#include <actuator/Fan.h>

ActuatorFan::ActuatorFan(int pin) : _pin(pin), _status(false) {}

void ActuatorFan::setStatus(bool status)
{
    _status = true;
}

// pulbic methods
void ActuatorFan::begin()
{
    pinMode(_pin, OUTPUT);
}

void ActuatorFan::turnOn()
{
    digitalWrite(_pin, HIGH);
    setStatus(true);
    Serial.println("Ligou a fan");
}

void ActuatorFan::turnOff()
{
    digitalWrite(_pin, LOW);
    setStatus(false);
    Serial.println("Desligou a fan");
}

bool ActuatorFan::getStatusFan()
{
    return _status;
}
