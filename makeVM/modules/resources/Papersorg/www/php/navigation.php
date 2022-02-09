<nav class="navbar navbar-dark navbar-expand bg-dark">
    <div class="container-fluid">
        <span class="navbar-brand mb-0 h1">Papers.org</span>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <!-- Add pages to google crawler optimization -->
                <a class="nav-link <?= $page == 0 ? 'active' : '' ?>" href="/">Browse</a>
                <a class="nav-link <?= $page == 1 ? 'active' : '' ?>" href="/contact.php">Contact Us</a>
            </div>
        </div>
        <div class="d-flex">
            <input id="search" class="form-control form-control-sm" type="search" placeholder="Search" aria-label="Search">
            <?php
                require_once "./php/auth.php";
                $user = auth_get_user();
            
                if ($user != null) {
                    echo '<div class="username ms-3">';
                    echo '<span style="white-space: nowrap;">'.$user["name"].'</span>';
                    echo '<span><a href="/logout.php" class="logout ms-2" style="white-space: nowrap;" title="Logout">&gt;</a></span>';
                    echo '<div>';
                } else {
                    echo '<a href="/signin.php" class="btn btn-sm btn-primary ms-2" role="button" style="white-space: nowrap;">Sign In</a>';
                }
            ?>
        </div>
    </div>
</nav>
