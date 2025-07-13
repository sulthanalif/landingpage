<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $questions = [
        [
            'question' => 'Kapan Lia Stephanie Catholic School (LSCS) didirikan?',
            'answer' => 'Lia Stephanie Catholic School (LSCS) didirikan pada tahun 2013.',
        ],
        [
            'question' => 'Apa tujuan dari didirikannya Lia Stephanie Foundation?',
            'answer' => 'Tujuannya adalah untuk mendiversifikasi pendidikan dalam hal bahasa global, khususnya Bahasa Inggris.',
        ],
        [
            'question' => 'Apa saja program pendidikan yang ditawarkan oleh LSCS?',
            'answer' => 'LSCS menawarkan program pendidikan tingkat prasekolah (preschool) dan saat ini telah berkembang dengan menambahkan program pendidikan dasar (primary).',
        ],
        [
            'question' => 'Berapa jumlah siswa yang terdaftar di LSCS pada tahun 2019?',
            'answer' => 'Lebih dari 250 siswa telah terdaftar di LSCS pada tahun 2019.',
        ],
        [
            'question' => 'Apa lingkungan belajar yang ditawarkan oleh LSCS?',
            'answer' => 'LSCS menyediakan lingkungan belajar berbahasa Inggris penuh, termasuk dalam percakapan sehari-hari, buku teks, dan metode pengajaran.',
        ],
        [
            'question' => 'Apa visi dari LSCS?',
            'answer' => 'Visi LSCS adalah mengembangkan pola pikir yang religius, inovatif, dan kreatif melalui proses pembelajaran di sekolah.',
        ],
        [
            'question' => 'Apa misi dari LSCS?',
            'answer' => 'Misi LSCS adalah menjadi rumah kedua bagi siswa untuk belajar dan berkembang, menyediakan fasilitas bagi guru dan staf untuk meningkatkan profesionalisme, serta menyediakan platform pendidikan yang baik untuk pengembangan akademik dan non-akademik siswa.',
        ],
        [
            'question' => 'Apa peran guru dan anugerah Tuhan dalam tujuan LSCS?',
            'answer' => 'Guru berperan memberikan bimbingan kepada siswa dalam meraih masa depan, dengan bantuan anugerah dari Tuhan.',
        ],
    ];

        foreach ($questions as $question) {
            \App\Models\Question::create($question);
        }

    }
}
