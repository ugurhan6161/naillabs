import 'package:flutter/material.dart';
import 'package:nailab_app/core/router/app_router.dart';
import 'package:nailab_app/core/theme/app_theme.dart';

void main() {
  runApp(const NailabApp());
}

class NailabApp extends StatelessWidget {
  const NailabApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'NAILAB',
      routerConfig: AppRouter.router,
      theme: AppTheme.buildTheme(),
      debugShowCheckedModeBanner: false,
    );
  }
}
