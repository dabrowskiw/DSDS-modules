<?php
error_reporting(0);
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Papers.org</title>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/bootstrap-utilities.min.css">
    <link rel="stylesheet" href="css/main.css">
</head>

<body>
    <?php $page = 1; include "./php/navigation.php"; ?>
    <main class="container-sm mt-5">
        <h3 class="mb-3">Our Organisation</h3>
        <p>
            Founded in 2005, Papers.org provides a simple way to access a large collection of scientific papers.
            Our team of admins regularly checks the quality of newly published papers to ensure an optimal basis for
            every scientific project. In case you have any questions or remarks please feel free to use our contact form.
        </p>
        <h3 class="mt-5 mb-3">Contact Us</h3>
        <form action="/contact.php" method="post">
            <div class="mb-3">
                <label class="form-label">Name</label>
                <input type="text" class="form-control">
            </div>
            <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="text" class="form-control">
            </div>
            <div class="mb-3">
                <label class="form-label">Subject</label>
                <input type="text" class="form-control">
            </div>
            <div class="mb-3">
                <label class="form-label">How can we help?</label>
                <textarea class="form-control" rows="5"></textarea>
            </div>
            <div class="mb-3 form-check">
                <input type="checkbox" id="policy-check" class="form-check-input">
                <label for="policy-check" class="form-check-label">I have read and accept the Privacy Policy</label>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </main>
    <script src="js/bootstrap.bundle.min.js"></script>
    <script src="js/main.js"></script>
</body>

</html>
