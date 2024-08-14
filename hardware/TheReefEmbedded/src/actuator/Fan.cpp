#include <actuator/Fan.h>

ActuatorFan::ActuatorFan(int pin) : _pin(pin), _status(false) {}

void ActuatorFan::setStatus(bool status)
{
    _status = status;
}

// pulbic methods
void ActuatorFan::begin()
{
    pinMode(_pin, OUTPUT);
    turnOff();
}

void ActuatorFan::turnOn()
{
    digitalWrite(_pin, LOW);
    setStatus(true);
    Serial.println("Ligou a fan");
}

void ActuatorFan::turnOff()
{
    digitalWrite(_pin, HIGH);
    setStatus(false);
    Serial.println("Desligou a fan");
}

bool ActuatorFan::getStatusFan()
{
    return _status;
}
