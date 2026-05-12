import { listDeployments } from './vercelClient.js';

async function checkDeploymentStatus() {
  console.log('📊 Vercel Deployment Status — Preeway Pressure Washing');
  console.log('='.repeat(55));

  try {
    const deployments = await listDeployments(5);

    if (deployments.length === 0) {
      console.log('\n⚠️  No deployments found for this project.');
      console.log('   Connect repo at: https://vercel.com/new');
      return;
    }

    console.log('\n📦 Recent Deployments:\n');
    deployments.forEach((d, i) => {
      const state = d.state ?? d.readyState;
      const icon = state === 'READY' ? '✅' : state === 'BUILDING' ? '⏳' : '❌';
      console.log(`${icon} ${i + 1}. https://${d.url}`);
      console.log(`   State: ${state}  ID: ${d.id}`);
      console.log('');
    });

    const latest = deployments[0];
    const latestState = latest.state ?? latest.readyState;

    console.log('─'.repeat(55));
    if (latestState === 'READY') {
      console.log(`✅ LIVE: https://${latest.url}`);
      console.log('   Latest deployment is ready.');
    } else {
      console.log(`🟡 Not ready — current state: ${latestState}`);
      console.log('   Check https://vercel.com/dashboard for build logs.');
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('\n❌ Error:', msg);
    console.log('\nCheck that VERCEL_TOKEN and VERCEL_PROJECT_ID are set in .env');
  }
}

checkDeploymentStatus();
