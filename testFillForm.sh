#! /bin/bash

function testMain () {
  node fillForm.js << EOF > /dev/null
Sampriti Das
1999-10-21
Singing,Dancing
7059358322
106 G.T. Road
Serampore, Hooghly
EOF

  echo -n '{"name":"Sampriti Das","dob":"1999-10-21","hobbies":["Singing","Dancing"],"phone":"7059358322","address":"106 G.T. Road\nSerampore, Hooghly"}' > testForm.json


  diff ./form.json ./testForm.json
  echo "Should register response to form.json"
}

testMain