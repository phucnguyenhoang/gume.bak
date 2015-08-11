<?php
class Editors extends GM_Controller {
    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $footer = array(
            'security_token_name' => $this->security->get_csrf_token_name(),
            'security_token' => $this->security->get_csrf_hash()
        );
        $this->load->view('editors/header');
        $this->load->view('editors/index');
        $this->load->view('editors/footer', $footer);
    }
}