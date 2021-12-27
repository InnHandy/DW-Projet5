const numeroCommande = document.getElementById("orderId")
            var url1= window.location.href;
            var url = new URL(url1);
            var id = url.searchParams.get("id");
            numeroCommande.innerHTML = id;