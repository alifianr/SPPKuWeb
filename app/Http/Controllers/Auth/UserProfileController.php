<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserProfileController extends Controller
{
    public function index()
    {
        $userProfile = [
            "student_nisn" => "202123456",
            "student_name" => "Zahra Aurira Hanifah",
            "student_nickname" => "Zahra",
            "student_class" => "VIII",
            "student_category" => "Reguler",
            "birth_place" => "Bali",
            "birth_date" => "30 November 2003",
            "gender" => "Perempuan",
            "account_code" => "123456",
            "email" => "zahra23@gmail.com",
            "phone" => "089123456789",
            "wali_kelas" => "Alifia Nurhasanah",
            "profile_pic" => "https://storage.googleapis.com/a1aa/image/mSZzznH9Yk4t61Nsp0auSBnSRrxz1oD_bdex_VKsNlA.jpg"
        ];

        return Inertia::render('User/ProfileUser', [
            'user' => $userProfile
        ]);
    }
}
