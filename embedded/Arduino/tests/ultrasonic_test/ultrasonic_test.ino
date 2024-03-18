#define TRIG_PIN 5
#define ECHO_PIN 12

void setup() {
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  Serial.begin(9600);
}

void loop() {
  long duration, distance;
  digitalWrite(TRIG_PIN, LOW);  
  delayMicroseconds(2); 
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10); 
  digitalWrite(TRIG_PIN, LOW);

  duration = pulseIn(ECHO_PIN, HIGH);
  distance = (duration/2) / 29.1;

  Serial.print(distance);
  Serial.println(" cm");
  delay(500);
}

