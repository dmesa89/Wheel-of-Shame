function updateIncident(id){
    console.log(2);
    console.log(2);
    $.ajax({
        url: '/searchByLicense/incident/' + id,
        type: 'PUT',
        data: $('#update-incident').serialize(),
        success: function(result){
            window.location.replace("/searchByLicense");
        }
    })
};