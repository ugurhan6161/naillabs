import 'package:flutter/material.dart';

class ContentScreen extends StatelessWidget {
  const ContentScreen({super.key, required this.slug});

  final String slug;

  @override
  Widget build(BuildContext context) {
    final title = slug.replaceAll('-', ' ');

    return Scaffold(
      appBar: AppBar(
        title: Text(title),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title[0].toUpperCase() + title.substring(1),
                style: const TextStyle(fontSize: 30, fontWeight: FontWeight.w500),
              ),
              const SizedBox(height: 16),
              const Text(
                'Bu sayfa admin tarafýndan düzenlenebilecek yasal ve içerik metinleri için hazýrlanmýþtýr. Metinler buradan yönetilebilir.',
                style: TextStyle(fontSize: 16, height: 1.7),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
