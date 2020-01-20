// search functionality
$('#photoSearch').keyup(function(){
    const criteria = $('#photoSearch').val().toLowerCase();
    for (let i = 0; i < 12; i ++){
        item = $('a')[i];
        const caption = item.getAttribute("data-caption").toLowerCase();
        if (caption.includes(criteria)) {
            item.parentElement.style.display = "block";
        } else {
            item.parentElement.style.display = "none";
        }
    }
});

// Fancybox plugin
$('[data-fancybox="gallery"]').fancybox({
    buttons: ["close"],
    hideScrollbar: false,
});