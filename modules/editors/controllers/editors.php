<?php
class Editors extends GM_Controller {
    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $this->load->view('editors/header');
        $this->load->view('editors/index');
        $this->load->view('editors/footer');
    }
}