function addOffense(id){
   $.ajax({
        
        url: '/searchByLicense/offense/' + id,
        type: 'PUT',
        data: $('#add-offense').serialize(),
        success: function(result){
            window.location.reload(true);
        }
    })
};

