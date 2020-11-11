function addOffenseOption(){
    $("#add-another-option").append(`
    <p><label for="Offense">Choose an Offense: </label>
    <select name="offense" id="incident_type">
    <option value="">Select an Option</option>
    <option value="1">DUI</option>
    <option value="2">Speeding</option>
    <option value="3">Running Red Light/Stop Sign</option>
    <option value="4">Reckless Driving</option>
    <option value="5">Road Rage</option>
    <option value="6">Littering</option>
    <option value="7">Illegal Parking</option>
    </select></p>
    `);
 };