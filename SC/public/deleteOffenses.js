function deleteOffense(id){
    $.ajax({
        url: '/searchByLicense/offense/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
