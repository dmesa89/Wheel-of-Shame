function deleteIncident(id){
    $.ajax({
        url: '/searchByLicense/incident/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};