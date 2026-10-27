import 'package:flutter/material.dart';
import 'package:nailab_app/core/theme/app_colors.dart';

class AuthScreen extends StatelessWidget {
  const AuthScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Giriş / Kayıt'),
          bottom: const TabBar(
            tabs: [
              Tab(text: 'Giriş'),
              Tab(text: 'Kayıt'),
            ],
          ),
        ),
        body: const TabBarView(
          children: [
            _LoginTab(),
            _RegisterTab(),
          ],
        ),
      ),
    );
  }
}

class _LoginTab extends StatelessWidget {
  const _LoginTab();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Column(
        children: [
          const TextField(decoration: InputDecoration(labelText: 'E-posta')),
          const SizedBox(height: 12),
          const TextField(decoration: InputDecoration(labelText: 'Şifre'), obscureText: true),
          const SizedBox(height: 20),
          SizedBox(
            width: double.infinity,
            child: FilledButton(
              onPressed: () {},
              child: const Text('Giriş yap'),
            ),
          ),
          const SizedBox(height: 20),
          TextButton(
            onPressed: () {},
            child: const Text('Şifremi unuttum'),
          ),
        ],
      ),
    );
  }
}

class _RegisterTab extends StatelessWidget {
  const _RegisterTab();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Column(
        children: [
          const TextField(decoration: InputDecoration(labelText: 'Ad Soyad')),
          const SizedBox(height: 12),
          const TextField(decoration: InputDecoration(labelText: 'E-posta')),
          const SizedBox(height: 12),
          const TextField(decoration: InputDecoration(labelText: 'Şifre'), obscureText: true),
          const SizedBox(height: 20),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: AppColors.cream100,
              borderRadius: BorderRadius.circular(16),
            ),
            child: const Text('KVKK açık rıza ve üyelik koşullarını onaylıyorum.'),
          ),
          const SizedBox(height: 20),
          SizedBox(
            width: double.infinity,
            child: FilledButton(
              onPressed: () {},
              child: const Text('Kayıt ol'),
            ),
          ),
        ],
      ),
    );
  }
}
